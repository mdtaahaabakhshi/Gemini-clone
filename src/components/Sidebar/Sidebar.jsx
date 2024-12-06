import React, { useContext, useState } from "react";
import css from "./Sidebar.module.css";
import { assets } from "../../assets/assets";
import { Context } from "../context/context";

const Sidebar = () => {
  const { onSent, prevPrompts, SetShowResult } = useContext(Context);
  
  const [extend, SetExtend] = useState(false);
  const newChat = () => {
    SetShowResult(false);
  };

  const loadPrompt = async(prompt)=>{
    await onSent(prompt)
  }
  return (
    <div className={css.sidebar}>
      <div className={css.top}>
        <img
          className={css.menu}
          src={assets.menu_icon}
          alt="menubar"
          onClick={() => SetExtend(!extend)}
        />
        <div  className={css.newChat}>
          <img
            onClick={() => newChat()}
            src={assets.plus_icon}
            alt="newChatIcon"
          />
          {extend ? <p  
 className={css.typing_effect}>New Chat</p> : null}
        </div>
        <div className={`${css.recent} ${extend ? css.show : ""}`}>
          {extend ? (
            <>
              <div className={css.recent_title}>
                {" "}
                <p>Recent</p>
              </div>
              {prevPrompts.map((item, i) => {
                return (
                  <div key={i} onClick={()=>loadPrompt(item)} className={css.recent_entry}>
                    <img src={assets.message_icon} alt="chatIcon" />
                    <p >{item.slice(0,18)}...</p>
                  </div>
                );
              })}
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
