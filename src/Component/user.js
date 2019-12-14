import React from 'react'
import { auth, db } from '../firebaseConfig'
class UserPage extends React.Component {
    state = {
        select: '',
        type: ''
    }
    componentWillMount() {
        db.ref().child('category').on('value', (snap) => {
            this.setState({
                allCategory: snap.val()
            })
        })
       
    }
    getTypes = (value) => {
        this.setState({
            allTypes: ''
        })
        db.ref().child('categoryType').child(value).on('value', (snap) => {
            this.setState({
                allTypes: snap.val()
            })
        })
    }
    addComment = () => {
        auth.onAuthStateChanged((user) => {
            if (user && this.state.comment && this.state.select && this.state.Type) {
                var obj = {
                    comment: this.state.comment,
                    uid: user.uid,
                    category: this.state.select,
                    topic: this.state.Type
                }
                db.ref().child('questions').child(this.state.select).child(this.state.Type).push(obj).then(() => {
                    this.setState({
                        comment: ''
                    })
                })
            }
        })
    }
    render() {
        return (
            // <h1>user</h1>
           
                <div className='form'>
                    <h3>user Panel</h3>
                    <h4>category</h4>
                    <select class="form-control" id="exampleFormControlSelect2" value={this.state.select} onChange={(ev) => {
                        this.getTypes(ev.target.value)
                        this.setState({ select: ev.target.value })
                    }}>
                        {this.state.allCategory && Object.values(this.state.allCategory).map((value, index) => {
                            return (
                                <option key={index} value={value}>{value}</option>

                            )
                        })}
                    </select><br /><br />
                    {this.state.allTypes && <h4>Topic</h4>}

                    {this.state.allTypes && <select class="form-control" id="exampleFormControlSelect2" value={this.state.Type} onChange={(ev) => {
                        this.setState({ Type: ev.target.value })
                    }}>
                        {Object.values(this.state.allTypes).map((value, index) => {
                            return (
                                <option key={index} value={value}>{value}</option>

                            )
                        })}
                    </select>}
                    {this.state.allTypes === '' && <h2>Loading.......</h2>}
                    {this.state.allTypes && <div>
                        <div class="form-group">
                            <label for="exampleFormControlTextarea1">Question</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={this.state.comment} onChange={(ev) => {
                                this.setState({ comment: ev.target.value })
                            }} placeholder='Enter Question'></textarea>
                        </div>
                        {/* <textarea /> <br /><br /> */}
                        <button className='btn btn-primary btn-lg btn-block' onClick={this.addComment}>Add Question</button><br />
                    </div>}
                    <button className='btn btn-danger btn-lg btn-block' onClick={this.props.signOut}>signOut</button>

                </div>
        )
    }
}
export default UserPage