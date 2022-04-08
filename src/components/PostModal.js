import { connect } from "react-redux";
import styled from "styled-components";
import { useState } from "react";
import ReactPlayer from "react-player";

const PostModal = (props) => {
  const [editorText, setEditorText] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [assetArea, setAssetArea] = useState("");

  const handleChange = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert(`not an image, the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };

  const switchAssetArea = (area) => {
    setShareImage("");
    setVideoLink("");
    setAssetArea(area);
  };

  const userImgSource = `${
    props.user ? props.user.photoURL : "/images/user.svg"
  }`;

  const reset = (e) => {
    setEditorText("");
    setShareImage("");
    setVideoLink("");
    props.handleClick(e);
  };

  return (
    <>
      {props.showModal === "open" && (
        <Container>
          <Post>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(e) => reset(e)}>
                <img src="/images/close-icon.png" alt="close icon" />
              </button>
            </Header>
            <SharedContent>
              <UserInfo>
                <img src={userImgSource} alt="user image"></img>
                <span>{props.user ? props.user.displayName : "Username"}</span>
              </UserInfo>
              <Editor onChange={(e) => setEditorText(e.target.value)}>
                <textarea
                  value={editorText}
                  placeholder="What do you want to talk about?"
                  autoFocus={true}
                />
              </Editor>
              {assetArea === "image" ? (
                <UploadImage>
                  <input
                    type="file"
                    accept="image/gif, image/jpeg, image/png"
                    name="image"
                    id="file"
                    style={{ display: "none" }}
                    onChange={handleChange}
                  />
                  <p>
                    <label htmlFor="file" style={{ cursor: "pointer" }}>
                      Select an image to share
                    </label>
                  </p>
                  {shareImage && (
                    <img src={URL.createObjectURL(shareImage)} alt="" />
                  )}
                </UploadImage>
              ) : (
                assetArea === "media" && (
                  <>
                    <input
                      type="text"
                      placeholder="Please input a video link from youtube"
                      value={videoLink}
                      onChange={(e) => setVideoLink(e.target.value)}
                    />
                    {videoLink && (
                      <ReactPlayer width={"100%"} url={videoLink} />
                    )}
                  </>
                )
              )}
            </SharedContent>
            <ShareCreation>
              <AttachAssets>
                <AssetButton onClick={() => switchAssetArea("image")}>
                  <img src="images/shared-img.png" alt="" />
                </AssetButton>
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <img src="images/shared-vid.png" alt="share video" />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton>
                  <img src="\images\shared-comment.png" alt="" />
                  Anyone
                </AssetButton>
              </ShareComment>
              <PostButton disabled={!editorText}>Post</PostButton>
            </ShareCreation>
          </Post>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  /* display: flex;
  justify-content: center;
  align-items: center; */
  animation: fadeIn 0.3s;
`;

const Post = styled.div`
  max-height: 90%;
  /* height: 552px; */
  width: 100%;
  max-width: 552px;
  background-color: white;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: block;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    height: 35px;
    width: 35px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    img {
      height: 15px;
      width: 15px;
      pointer-events: none;
    }
  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;

  input {
    width: 90%;
    margin: 0 auto;
    padding: 10px 0;
    margin: 10px auto;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const ShareCreation = styled.div`
  display: flex;
  padding: 12px 24px 12px 16px;
  justify-content: space-between;
`;

const AssetButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  img {
    height: 20px;
    width: 20px;
  }
`;

const AttachAssets = styled.div`
  align-items: center;
  display: flex;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  ${AssetButton} {
    img {
      margin-right: 5px;
    }
  }
`;

const PostButton = styled.button`
  min-width: 60px;
  border-radius: 20px;
  padding-left: 20px;
  padding-right: 20px;
  background: ${(props) => (props.disabled ? "rgba(0,0,0,0.6)" : "#0a66c2")};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  color: ${(props) => (props.disabled ? "rgba(1,1,1, 0.5)" : "white")};
  border: 1px solid rgba(0, 0, 0, 0.6);
  &:hover {
    background: ${(props) => (props.disabled ? "rgba(0,0,0,0.08)" : "#004182")};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    border: 1px solid rgba(0, 0, 0, 0.2);
    color: rgba(0, 0, 0, 0.8);
  }

  input {
    width: 100%;
    height: 34px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 90%;
    padding: 10px 0;
  }
  input {
    width: 90%;
    height: 34px;
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const mapStateToProps = (state) => {
  return { user: state.userState.user };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps)(PostModal);
