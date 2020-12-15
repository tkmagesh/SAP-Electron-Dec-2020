import React from 'react';

class BugEdit extends React.Component{
    state = {
        newBugName: ''
    };

    onAddNewClick = () => {
        const { newBugName } = this.state,
            newBug = {
                id: 0,
                name: newBugName,
                isClosed: false
            };
        this.props.onNewBug(newBug);
    }
    render(){
        return(
            <section className="edit">
                <label htmlFor="">Bug Name :</label>
                <input type="text" onChange={evt => this.setState({ newBugName: evt.target.value })} />
                <input type="button" value="Add New" onClick={this.onAddNewClick} />
            </section>
        )
    }
}

export default BugEdit;