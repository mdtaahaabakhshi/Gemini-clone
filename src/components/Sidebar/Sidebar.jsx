import React, { useState } from "react";
import css from "./Sidebar.module.css";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  const [extend, SetExtend] = useState(false);
  return (
    <div className={css.sidebar}>
      <div className={css.top}>
       <img
          className={css.menu}
          src={assets.menu_icon}
          alt="menubar"
          onClick={() => SetExtend(!extend)}
        />
        <div className={css.newChat}>
          <img src={assets.plus_icon} alt="newChatIcon" />
          {extend ? <p className={css.typing_effect}>New Chat</p> : null}
        </div>
        <div className={`${css.recent} ${extend ? css.show : ""}`}>
          {extend ? (
            <>
              <p className={css.recent_title}>Recent</p>

              <div className={css.recent_entry}>
                <img src={assets.message_icon} alt="chatIcon" />
                <p>What is react ...</p>
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div className={css.bottom}>
        <div className={`${css.bottom_item} ${css.recent_entry} `}>
          <img src={assets.question_icon} alt="quesIcon" />
          {extend ? <p>Help</p> : null}
        </div>
        <div className={`${css.bottom_item} ${css.recent_entry}`}>
          <img src={assets.history_icon} alt="hisIcon" />
          {extend ? <p>Activity</p> : null}
        </div>
        <div className={`${css.bottom_item} ${css.recent_entry}`}>
          <img src={assets.setting_icon} alt="settingIcon" />
          {extend ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
