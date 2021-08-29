import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SigninComponent from "./Components/Access/SigninComponent";
import SignupComponent from "./Components/Access/SignupComponent";
import CreateBlogComponent from "./Components/CreateBlog/CreateBlogComponent";
import HomeComponent from "./Components/Home/HomeComponent";
import { isUserLoggedIn, signout } from "./redux/actions/signinActions";
import jwt_decode from "jwt-decode";
import BlogComponent from "./Components/Blog/BlogComponent";
import BlogsByTopicComponent from "./Components/Blog/BlogsByTopicComponent";
import PrivateRoute from "./PrivateRoute";
import MyBlogsComponent from "./Components/Blog/MyBlogsComponent";
import UpdateBlog from "./Components/Blog/UpdateBlog";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      if (jwt_decode(token).exp < Date.now() / 1000) {
        dispatch(signout());
        dispatch(isUserLoggedIn());
      }
    }

    console.log(auth.authenticate);
  }, []);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomeComponent} />
        <PrivateRoute path="/createblog" component={CreateBlogComponent} />
        <PrivateRoute path="/myblogs" component={MyBlogsComponent} />
        <PrivateRoute path="/updateblog/:blogId" component={UpdateBlog} />
        <Route path="/blog/:blogId" component={BlogComponent} />
        <Route path="/bytopic/:topicId" component={BlogsByTopicComponent} />
        <Route path="/signup" component={SignupComponent} />
        <Route path="/signin" component={SigninComponent} />
      </Switch>
    </Router>
  );
}

export default App;
