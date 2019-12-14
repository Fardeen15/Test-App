import React from 'react'
import { auth, db } from '../firebaseConfig'
class AdminPage extends React.Component {
    state = {
        category: '',
        Types: '',
        select: '',
        allCategory: ''
    }
    addCategory = () => {
        if (this.state.category) {
            db.ref().child('category').push(this.state.category).then(() => {
                this.setState({
                    select: '',
                    Types: '',
                    category: '',
                })
            })
        }
    }
    addType = () => {
        if (this.state.select !== 'select Topic' && this.state.Types) {
            db.ref().child('categoryType').child(this.state.select).push(this.state.Types).then(() => {
                this.setState({
                    select: '',
                    Types: ''
                })
            })

        }
    }
    componentWillMount() {
        db.ref().child('category').on('value', (snap) => {
            // console.log(snap.val())
            this.setState({
                allCategory: snap.val()
            })
        })
        db.ref().child('questions').on('value', (snap) => {
            this.setState({
                questions: snap.val()
            })
        })
    }
    render() {
        return (
            this.state.view
                ?
                <table class="table">
                    <thead class="thead-light">

                        <tr>
                            <th>Category</th>
                            <th>Topic</th>
                            <th>Questions</th>
                            <th > <button className='btn btn-info btn-lg btn-block' onClick={() => this.setState({ view: false })}>Back</button></th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.questions && Object.values(this.state.questions).map((value, index) => {
                            return Object.values(value).map((value2, index) => {
                                return Object.values(value2).map((value3, index) => {
                                    console.log(value3)
                                    return (
                                        // <tbody style={{ margin: '10px' }} class="alert-warning">

                                        <tr>
                                            {/* <th>Category : </th> */}
                                            <td>{value3.category}</td>
                                            {/* </tr>
                                        <tr>
                                            <th>Topic : </th> */}
                                            <td>{value3.topic}</td>
                                            {/* </tr>
                                        <tr>
                                            <th>Commet : </th> */}
                                            <td colSpan='2'>{value3.comment}</td>
                                        </tr>
                                        // </tbody>
                                    )
                                })
                            })
                        })}

                    </tbody>
                </table >
                : <div className='form'>
                    <h3>Admin Panel</h3>
                    <h4>Add Category</h4>
                    <input class="form-control" id="exampleFormControlInput1" value={this.state.category} onChange={(ev) => this.setState({ category: ev.target.value })} placeholder='category' /> <br />
                    <button className='btn btn-primary btn-lg btn-block' onClick={this.addCategory}>add</button><br /><br />
                    <h4>Add Topic</h4>
                    <select class="form-control" id="exampleFormControlSelect2" value={this.state.select} onChange={(ev) => this.setState({ select: ev.target.value })}>
                        <option value='select Topic'>select Topic</option>

                        {this.state.allCategory && Object.values(this.state.allCategory).map((value, index) => {
                            return (
                                <option key={index} value={value}>{value}</option>

                            )
                        })}
                    </select><br /><br />
                    <input class="form-control" id="exampleFormControlInput1" type='text' value={this.state.Types} onChange={(ev) => this.setState({ Types: ev.target.value })} placeholder='Add selected Category Topic' /> <br />
                    <button className='btn btn-primary btn-lg btn-block' onClick={this.addType}>add Topic</button><br />
                    <button className='btn btn-info btn-lg btn-block' onClick={() => this.setState({ view: true })}>View Questions</button>
                    <button className='btn btn-danger btn-lg btn-block' onClick={this.props.signOut}>SignOut</button>
                </div>
        )
    }
}
export default AdminPage