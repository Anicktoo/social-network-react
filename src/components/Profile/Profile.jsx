import React from 'react';
import s from './Profile.module.css';
import { classNameFunction } from "../../utils/classNameCompiler";
import AccountData from "./AccountData/AccountData";
import NewPostContainer from "./NewPost/NewPostContainer";
import Posts from "./Posts/Posts";

const cName = classNameFunction(s);
const Profile = (props) => {
    return (
        <main className={cName(['profile'])}>
            <AccountData {...props.accountInfo}
                {...props.common}
                updateUserStatus={props.updateUserStatus}
                isFetching={props.isFetching} />
            <NewPostContainer {...props.newPost}
                {...props.common}
                addPost={props.addPost}
                changeTextInput={props.changeTextInput}
                isFetching={props.isFetching} />
            <Posts posts={props.posts}
                {...props.common}
                isFetching={props.isFetching} />
        </main>
    );
}

export default Profile;
