import MyClassGnb from "src/components/gnb/MyClassGnb"
import Store from "src/reducers/index"
import "./MyClass.scoped.scss"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
const UserProfile = ({ props }) => {
    const state = props.location.state;
    const dispatch = useDispatch();
    const userInfo = useSelector((state: ReturnType<typeof Store>) => {
        console.log(state.userInfoSet.userInfo);
        return (state.userInfoSet.userInfo) as { [key: string]: any }
    })
    useEffect(() => {
    }, [])
    return (
        userInfo != null ? <div>
            <span
                className="profile"
                style={{
                    background: `url(${userInfo.profile_image}) no-repeat 
      center / 100% 100%`,
                }}
            >
            </span>
            <span className="name">{userInfo.username}님의 강의실</span>
            <p className="email">
                {userInfo.email}
            </p>
            {state != undefined || userInfo.status == 1 && <div>
                <span className="report">프로필</span>
                <span className="convert">학생전환</span>
                <span className="convert">강사전환</span>
            </div>}
        </div> : null
    )
};
const MyClass = (props) => {
    console.log(props);
    return (
        <div>
            <UserProfile props={props}></UserProfile>
            <MyClassGnb></MyClassGnb>
        </div>
    )
}
export default MyClass