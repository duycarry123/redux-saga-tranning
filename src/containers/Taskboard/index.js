import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import TaskList from '../../components/TaskList/index'
import TaskForm from '../../components/TaskForm/index'
import styles from './style'
import { STATUSS } from '../../contants/index'
import * as Actions from '../../actions/task'


class TaskBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    componentDidMount() {
        
    }

    renderTaskBoard = (listTask) => {
        var xhtml = null;
        xhtml = (
            <Grid container spacing={8}>
                {
                    STATUSS.map((status, index) => {
                        // render dung theo status
                        var taskBoardFilter = listTask.filter((tark) => {
                            return tark.status === status.value
                        })
                        return <TaskList task={taskBoardFilter} status={status} key={index}></TaskList>
                    })
                }
            </Grid>
        )
        return xhtml;
    }

    onOpenDialog = () => {
        this.setState({
            open: true
        })
    }

    handleCloseDialog = () => {
        this.setState({
            open: false
        })
    }

    renderTaskForm = () => {
        var xhtml = null;
        const { open } = this.state;
        xhtml = <TaskForm open={open} onCloseDialog={this.handleCloseDialog}></TaskForm>
        return xhtml;
    }

    loadDataDemo = () => {
        const { fectListTask } = this.props;
        console.log(fectListTask)
        fectListTask();
    }

    render() {
        const { classes, listTask } = this.props;
        return (
            <div className={classes.TaskList}>
                <Button onClick={this.loadDataDemo} variant="contained" color="primary" style={{marginRight: "20px"}}>
                    Load data
                </Button>
                <Button variant="contained" color="primary" onClick={this.onOpenDialog}>
                    <span className="material-icons">
                        add
                    </span>
                    Add New Tasks
                </Button>
                {this.renderTaskBoard(listTask.listTask)}
                {this.renderTaskForm()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        listTask: state.tasks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fectListTask: () => {
            // dispatch(Actions.fectListTaskRequest());
            dispatch(Actions.fetchTask());

        }
    }
}

TaskBoard.propTypes = {
    fectListTaskRequest: PropTypes.func,
    listTask: PropTypes.shape({
        listTask: PropTypes.array
    })
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TaskBoard));