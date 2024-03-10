import s from "./Users.module.css";
import { classNameFunction } from "../../tools/classNameCompiler";
import UserItem from "./Usertem/UserItem";

const cName = classNameFunction(s);
const MAX_PAGES_IN_BAR = 11;

const getPagesBarUIInfo = (maxPagesInMenu, currentPage, totalUsersCount, pageSize) => {

    const getStartEndIndexes = (maxNumbersOnPage, curPage, pagesCount) => {
        if (pagesCount <= maxNumbersOnPage) {
            return { startInd: 1, endInd: pagesCount };
        }

        const delta = Math.floor(maxNumbersOnPage / 2);
        const pagesToFirst = curPage - 1;
        const pagesToLast = pagesCount - curPage;

        if (pagesToFirst <= delta) {
            return { startInd: 1, endInd: maxNumbersOnPage };
        }
        if (pagesToLast <= delta) {
            return { startInd: pagesCount - maxNumbersOnPage, endInd: pagesCount };
        }

        return { startInd: curPage - delta, endInd: curPage + delta };
    }

    const curPage = currentPage;
    const pagesCount = Math.ceil(totalUsersCount / pageSize);

    let { startInd, endInd } = getStartEndIndexes(maxPagesInMenu, curPage, pagesCount);

    const startGap = startInd !== 1;
    const endGap = endInd !== pagesCount;

    if (startGap) startInd += 2;
    if (endGap) endInd -= 2;

    const pages = [];
    for (let i = startInd; i <= endInd; i++) {
        pages.push(i);
    }

    return {
        pagesCount,
        pages,
        startGap,
        endGap
    };
}

const Users = (props) => {

    const { pagesCount, pages, startGap, endGap } = getPagesBarUIInfo(MAX_PAGES_IN_BAR, props.currentPage, props.totalUsersCount, props.pageSize);

    const startBarItem = () => <>
        <div className={cName(['page-item'])}
            onClick={() => {
                props.pageChange(1)
            }}>
            1
        </div>
        <div className={cName(['page-item', 'blocked'])}>...</div>
    </>;

    const endBarItem = () => <>
        <div className={cName(['page-item', 'blocked'])}>...</div>
        <div className={cName(['page-item'])}
            onClick={() => {
                props.pageChange(pagesCount)
            }}>
            {pagesCount}
        </div>
    </>;

    const defBarItems = () => pages.map(el => {
        const isCurrent = props.currentPage === el ? 'current-page' : '';
        return (<div className={cName(['page-item', isCurrent])}
            onClick={() => {
                props.pageChange(el)
            }}
        >
            {el}
        </div>);
    });

    return (<main className={s.friends}>
        <div className={cName(['friendsContainer', 'stdBlock'])}>
            <header className={s.header}>
                <span>All Users</span>
                <div className={cName(['page-container'])}>
                    {startGap && startBarItem()}
                    {defBarItems()}
                    {endGap && endBarItem()}
                </div>
            </header>
            <div className={s.usersList}>
                {props.users.map(el => <UserItem key={el.id}
                    {...el}
                    isFetching={props.isFetching}
                    addFriend={props.addFriend}
                    follow={props.follow}
                    unfollow={props.unfollow}
                    setFollowingState={props.setFollowingState}
                />
                )}
            </div>
        </div>
    </main>);
};

export default Users;
