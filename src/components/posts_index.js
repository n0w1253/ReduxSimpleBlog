import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions'  //same as ../action/index
import _ from 'lodash'
import { Link } from 'react-router-dom'  // <a> tag fetches new html pages from server <link> tags loads react componets


class PostsIndex extends Component {
    //life cycle method
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts(){
        return _.map(this.props.posts, post => {
            return (
                <li className="list-group-item" key={post.id}>
                    <Link to={`/posts/${post.id}`}>{post.title}
                    </Link>
                </li>
            )
        })
    }

    render() {

        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">
                        Add a Post
                    </Link>
                </div>
                <h3>Posts Index</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ posts }) {  //same as mapStateToProps(state){ return {posts:state.posts};}
    return { posts };
}

//short cut  instead of using mapDispatchToProps, connect is taking care of it for us
//sometime we do need a separate break up map... functions
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);