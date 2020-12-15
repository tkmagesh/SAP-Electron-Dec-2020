import React from 'react';
import BugStats from './BugStats';
import BugEdit from './BugEdit';

class BugTracker extends React.Component{
    state = {
        newBugName : '',
        bugs : []
    };

    onNewBugCreated = (newBug) => {
        if (newBug.id === 0){
            newBug.id = this.state.bugs.reduce((result, bug) => result > bug.id ? result : bug.id, 0) + 1
        };
        this.setState({ bugs : [...this.state.bugs, newBug ]});
    }

    onBugNameClick = (bugToToggle) => {
        const toggledBug = { ...bugToToggle, isClosed : !bugToToggle.isClosed },
            { bugs } = this.state,
            updatedBugs = bugs.map(bug => bug.id === bugToToggle.id ? toggledBug : bug);
        this.setState({ bugs : updatedBugs });
    }

    onRemoveClick = (bugToRemove) => {
        const { bugs } = this.state,
            updatedBugs = bugs.filter(bug => bug.id !== bugToRemove.id);
        this.setState({bugs : updatedBugs});
    }

    onRemoveClosedClick = () => {
        const { bugs } = this.state,
            updatedBugs = bugs.filter(bug => !bug.isClosed);
        this.setState({bugs : updatedBugs});
    }

    render(){
        const { bugs } = this.state,
            bugItems = bugs.map(bug => (
                <li key={bug.id}> 
                    <div className={'bugname ' + (bug.isClosed ? 'closed' : '')} onClick={() => this.onBugNameClick(bug)}>
                        {bug.name}
                    </div>
                    <input type="button" value="Remove" onClick={() => this.onRemoveClick(bug)} />
                </li>
            ));
            
        return(
            <div>
                <h1>Bug Tracker</h1>
                <hr />
                <BugStats bugs={bugs} />
                <BugEdit onNewBug={this.onNewBugCreated} />
                <section className="list">
                    <ol>
                        {bugItems}
                    </ol>
                    <input type="button" value="Remove Closed" onClick={this.onRemoveClosedClick} />
                </section>
            </div>
        )
    }
}

export default BugTracker;