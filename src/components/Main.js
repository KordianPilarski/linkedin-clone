import { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PostModal from "./PostModal";

const Main = (props) => {
  const [showModal, setShowModal] = useState("close");
  const userImgSource = `${
    props.user ? props.user.photoURL : "./images/user.svg"
  }`;

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }

    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
    }
  };

  return (
    <Container>
      <ShareBox>
        <div>
          <img src={userImgSource} alt="user image" />
          <button onClick={handleClick}>Add a post</button>
        </div>
        <div>
          <button>
            <img src="./images/photo-icon.png" alt="user image" />
            <span>Photo</span>
          </button>
          <button>
            <img src="./images/video-icon.png" alt="video icon" />
            <span>Video</span>
          </button>
          <button>
            <img src="./images/event-icon.png" alt="event image" />
            <span>Event</span>
          </button>
          <button>
            <img src="./images/article-icon.png" alt="article image" />
            <span>Write article</span>
          </button>
        </div>
      </ShareBox>
      <div>
        <Article>
          <SharedActor>
            <a>
              <img src={userImgSource} alt="user image" />
              <div>
                <span>Title</span>
                <span>Info</span>
                <span>Date</span>
              </div>
            </a>
            <button>
              <img src="./images/ellipsis.png" alt="elipsis image" />
            </button>
          </SharedActor>
          <Description>desc</Description>
          <SharedImg>
            <a>
              <img src="./images/shared-img.jpg" alt="shared image" />
            </a>
          </SharedImg>
          <SocialCounts>
            <li>
              <button>
                <img
                  src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"
                  alt="like"
                />
                <img
                  src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f"
                  alt="hand clap "
                />
                <span>7</span>
              </button>
            </li>
            <li>
              <a>4 comments</a>
            </li>
          </SocialCounts>
          <SocialActions>
            <button>
              <img src="./images/like-icon.png" alt="like button " />
              <span>Like</span>
            </button>
            <button>
              <img src="./images/comment-icon.png" alt="comment button " />
              <span>Comments</span>
            </button>
            <button>
              <img src="./images/share.svg" alt="share button" />
              <span>Share</span>
            </button>
            <button>
              <img src="./images/send.svg" alt="send button" />
              <span>Send</span>
            </button>
          </SocialActions>
        </Article>
      </div>
      {showModal && (
        <PostModal showModal={showModal} handleClick={handleClick} />
      )}
    </Container>
  );
};

const Container = styled.div`
  grid-area: main;
`;

const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 /20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px;
  background: white;

  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
      cursor: pointer;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        height: 48px;
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        background-color: white;
        text-align: left;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.12);
      }
    }

    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -2px;
          max-height: 30px;
        }
        span {
          color: #70b5f9;
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 8px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
    img {
      width: 48px;
      height: 48px;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }

        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
    img {
      width: 22px;
    }
  }
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;
const SharedImg = styled.div`
  margin-top: 8px;
  wisth: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const SocialCounts = styled.ul`
  list-style: none;
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
    }
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;

  img {
    max-height: 18px;
  }

  button {
    display: inline-flex;
    align-items: center;
    padding: 4px;
    color: #0a66c2;
    min-width: 90px;
    span {
      margin-left: 4px;
    }

    @media (min-width: 818px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(Main);
