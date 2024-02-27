import {connect} from 'react-redux';
import UserItem from './UserItem';
import {addFriendAC, removeFriendAC} from "../../../redux/usersReducer";

const mapStateToProps = (state, props) => {
    return {
        ...props.userInfo
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addFriend: (userId) => dispatch(addFriendAC(userId)),
        removeFriend: (userId) => dispatch(removeFriendAC(userId)),
    };
}

const UserItemContainer = connect(mapStateToProps, mapDispatchToProps)(UserItem);

export default UserItemContainer;