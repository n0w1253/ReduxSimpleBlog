import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost } from '../actions'

class PostsNew extends Component {

    renderField(field) {  //field : a single piece of state
        const { meta: { touched, error } } = field  //destructuring/pulling out meta ; and touched and error from meta object

        const className = `form-group ${touched && error ? 'has-danger'  : ''}`

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                {touched ? error : ''}
                </div>

            </div>
        )  //field.meta.error automatically added to field through validate function
    }

    onSubmit(values) {
        // this === component

        this.props.createPost(values, () => {
            this.props.history.push('/')
        })
    }

    render() {
        const { handleSubmit } = this.props

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"   //any prop will be attached to "field"
                    name="title"    //piece of state, must be identical to the prop name in the errors object (validate function)
                    component={ this.renderField }
                />
                <Field
                    label="Categories"
                    name="categories"    //piece of state
                    component={ this.renderField }
                />
                <Field
                    label="Post Content"
                    name="content"    //piece of state
                    component={ this.renderField }
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        )
    }
}

function validate(values) {
    // console.log(values) -> { title:"fda", categories:"daga", content:"ate" }
    const errors = {}

    // validate the inputs form 'values'
    if (!values.title) {
        errors.title = "Enter a title that is at least 3 characters!"
    }

    if (!values.categories) {
        errors.categories = "Enter some categories!"
    }

    if (!values.content) {
        errors.content = "Enter some categories!"
    }


    // if errors is empty, the form is fine to submit
    // if errors has *any* properties, redux form assumes form is invalid
    return errors;
}

export default reduxForm({
    validate,   //same as validate: validate
    form: 'PostsNewForm'   //name of the form
})(
    connect(null, { createPost })(PostsNew)
)