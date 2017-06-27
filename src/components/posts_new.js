import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost } from '../actions'
import _ from 'lodash'

const FIELDS = {
    title: {
        type: 'input',
        label: 'Title for Post'
    },
    categories: {
        type: 'input',
        label: 'Enter some categories for this post'
    },
    content: {
        type: 'textarea',
        label: 'Post Contents'
    }
};

class PostsNew extends Component {

    renderField(field) {  //field : a single piece of state
        const { meta: { touched, error } } = field  //destructuring/pulling out meta ; and touched and error from meta object

        const className = `form-group ${touched && error ? 'has-danger'  : ''}`

        return (
            <div className={className}>
                <label>{field.label}</label>
                <field.type
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

    renderReduxField(fieldConfig, field) {
       // console.log("fieldConfig is "+fieldConfig);
        return (
            <Field
                key={fieldConfig.label}
                label={fieldConfig.label}  //any prop will be attached to "field"
                name={field}    //piece of state, must be identical to the prop name in the errors object (validate function)
                type={fieldConfig.type}
                component={ this.renderField }
            />
        )

    }
    render() {
        const { handleSubmit } = this.props

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                {_.map(FIELDS, this.renderReduxField.bind(this))}

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
    _.each(FIELDS, (type, field) => {
       // console.log(type+"  "+field)
        if (!values[field]) {
            errors[field] = `Enter a ${field}`;
        }
    });


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