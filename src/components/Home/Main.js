import { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PostModal from '../UI/PostModal';

import { getArticleAPI } from "../../Actions";
import ReactPlayer from "react-player";

const Main = (props) => {

    const[showModal, setShowModal]= useState("close");

    useEffect(() => {
        props.getArticles()
    }, []);

    const handleClick = (e) =>{
        e.preventDefault();
        // if(e.target !== e.currentTerget){
        //     return;
        // }

        switch(showModal){
            case "open":
                setShowModal("close");
                break;
            
            case "close":
                setShowModal('open');
                break;

                default: 
                setShowModal('close');
                break;
         
        }
    };

    return(
    <>
    {/* { 
        props.articles.length === 0 ? (
        <p>There are no posts yet...</p>
        )
          : ( */}
        <Container>
            <ShareBox>
                <div>
                    {props.user && props.user.photoURL ? 
                        <img src={props.user.photoURL}/>
                    :
                        <img src="/img/user.svg" alt="" />
                    }
                    <button onClick={handleClick}
                            disabled={props.loading ? true: false}
                    >Start a post</button>
                </div>
                <div>
                    <button >
                        <img src='/img/photo-icon.svg'/>
                        <span>Photo</span>
                    </button>
                    <button>
                        <img src='/img/video.svg'/>
                        <span>Video</span>
                    </button>
                    <button>
                        <img src='/img/event-icon.svg'/>
                        <span>Event</span>
                    </button>
                    <button>
                        <img src='/img/article-icon.svg'/>
                        <span>Article</span>
                    </button>
                </div>
            </ShareBox>
            <Content>
                <Loader>
                {
                    props.loading && <img  src='./img/puff.svg'/>
                    
                }
                </Loader>
                {props.articles.length > 0 && 
                props.articles.map((article, key) => (
                    
                    <Article key={key}>
                        <SharedActor>
                            <a>   
                                {/* <img src='/img/user.svg'/> */}
                                <img src = {article.actor.image}/>
                                <div>
                                    <span>{article.actor.title}</span>
                                    <span>{article.actor.user_email_address}</span>
                                    <span>{article.actor.date.toDate().toLocaleDateString()}</span>
                                </div>
                            </a>
                            <button>
                                <img src='/img/ellipses.svg'/>
                            </button>
                        </SharedActor>
                        <Description>{article.description}</Description>
                        <SharedImg>
                            <a>
                                {/* <img src='/img/shared-image.jpeg'/> */}
                                { !article.sharedImg && article.video ? (<ReactPlayer width={'100%'}  url={article.video}/> )
                                :
                                (
                                    article.sharedImg && <img src={article.sharedImg[1]} /> 
                                )
                                                               
                                }
                            </a>
                        </SharedImg>
                        <SocialCounts>
                            <li>
                                <button>
                                    <img src='https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb'/>
                                    <img src='https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f'/>
                                    <span>75</span>
                                </button>
                            </li>
                            <li>
                                <a>{article.comments} comments</a>
                            </li>
                        </SocialCounts>
                        <SocialActions>
                            <button>
                                <img src='/img/like-icon.svg'/>
                                <span>Like</span>
                            </button>
                            <button>
                                <img src='/img/comments-icon.svg'/>
                                <span>Comments</span>
                            </button>
                            <button>
                                <img src='/img/send-icon.svg'/>
                                <span>Send</span>
                            </button>
                            <button>
                                <img src='/img/share-icon.svg'/>
                                <span>Share</span>
                            </button>
                        </SocialActions>
                    </Article>
                ))}
                </Content>  
            <PostModal showModal={showModal} handleClick={handleClick}/>
        </Container>
          {/* )} */}
    </>
    );
}

const Container = styled.div`
    grid-area : main;
`;

const CommonCard= styled.div`
    text-align: center;
    overflow:hidden;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius:5px;
    position:relative;
    box-shadow: 0 0 0 1px rgba(0 0 0 / 15%), 0 0 0 rgba(0 0 0 /20%);
    border: none;

`;

const ShareBox = styled(CommonCard)`
    display:flex;
    flex-direction: column;
    color: #958b7b;
    margin: 0 0 8px;
    background: white;

    div{
        button{
            outline:none;
            color: rgba(0 , 0, 0 , 0.6);
            font-size: 14px;
            line-height: 1.5;
            min-height: 48px;
            background:transparent;
            cursor: pointer;
            border: none;
            display: flex;
            align-items:center;
            font-weight: 600;
            padding: 10px 12px ;

        }
        &:first-child{
            display:flex;
            align-items:center;
            padding: 8px 16px 0px 16px;

            img{
                width: 48px;
                border-radius:50%;
                margin-right:8px;

            }
            button{
                margin: 4px 0;
                flex-grow: 1;
                border-radius: 35px;
                padding-left: 16px;
                border: 1px solid rgba(0, 0, 0, 0.15);
                background-color: white;
                text-align: left;
            }
        }
        &:nth-child(2){
            display: flex;
            flex-wrap:wrap;
            justify-content:space-around;
            padding-bottom: 4px;

            button{
                img{
                    margin:0 4px 0 -2px;
                    width:18px;
                }
                span{
                    color:#70b5f9
                }
            }
        }
    }
`;

const Article = styled(CommonCard)`
    padding: 0;
    margin: 0 0 8px;
    overflow:visible;
`;

const SharedActor = styled.div`
    padding-right: 40px;
    flex-wrap:nowrap;
    padding: 12px 16px 0;
    margin-bottom: 8px;
    align-items:center;
    display:flex;
    
    a{
        margin-right:12px;
        flex-grow:1;
        overflow:hidden;
        display:flex;
        text-decoration:none;

        img{
            width:48px;
            height:48px;

        }
        &>div{
            display:flex;
            flex-direction:column;
            flex-grow:1;
            flex-basis:0;
            margin-left: 8px;
            overflow:hidden;
            span{
                text-align:left;
                &:first-child{
                    font-size: 14px;
                    font-weight:700;
                    color: rgba(0,0,0,1);
                }
                &:nth-child(n+1){
                    font-size:12px;
                    color:rgba(0,0,0,0.6);

                }
            }
        }
    }

    button{
        position: absolute;
        right:12px;
        top:10px;
        background:transparent;
        border:none;
        outline:none;
        cursor:pointer;
        img{
            width:18px;
        }
    }
`;

const Description =  styled.div`
    padding : 0 16px;
    overflow: hidden;
    color: rgba(0,0,0,0.9);
    font-size:14px;
    text-align:left;
`;

const SharedImg= styled.div`
    margin-top: 8px;
    width: 100%;
    display:block;
    position: relative;
    background-color: #f9fafb;

    img{
        object-fit: contain;
        width: 100%;
        height: 100%;
    }
`;

const SocialCounts= styled.ul`
    line-height:1.3;
    display: flex;
    align-items: flex-start;
    overflow: hidden;
    margin: 0 16px;
    padding: 8px 0;
    border-bottom: 1px solid #e9e5df;
    list-style:none;
    
    li{
        margin-right:5px;
        font-size:12px;
        cursor: pointer;

        button{
            display:flex;
            border:none;
            background-color:white;
        }
    }
`;

const SocialActions = styled.div`
    align-items:center;
    display: flex;
    justify-content: flex-start;
    margin: 0;
    min-height: 40px;
    padding: 4px 8px;
    
    img{
        width:15px;
    }
    button{
        display: inline-flex;
        align-items: center;
        padding: 8px;
        color: #0a66c2;
        cursor: pointer;
        border:none;
        background-color:white;

        @media(min-width:768px){
            span{
                margin-left:8px;
            }
        
        }
    }
`;

const Content = styled.div`
    text-align: center;
    & > img{
        width: 30px;
    }
`;

const Loader = styled.div`
    img{
        background-color: black;
        border-radius: 50%;
    }

`;



const mapStateToProps = (state)  => {
    return{
        user: state.userState.user,
        loading: state.articleState.loading,
        articles: state.articleState.articles,
    }
};

const mapDispatchToProps =(dispatch)=> ({
    getArticles: () => dispatch(getArticleAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);