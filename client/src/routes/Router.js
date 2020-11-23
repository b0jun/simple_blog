import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppNavbar from '../components/AppNavbar';
import { Container } from 'reactstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import PostCardList from './normalRoute/PostCardList';
import PostWrite from './normalRoute/PostWrite';
import PostDetail from './normalRoute/PostDetail';
import Search from './normalRoute/Search';
import CategoryResult from './normalRoute/CategoryResult';
import PostEdit from './ProtectedRoute/PostEdit';
import { EditProtectedRoute, ProfileProtectedRoute } from './ProtectedRoute';
import Profile from './ProtectedRoute/Profile';

const MyRouter = () => (
  <>
    <AppNavbar />
    <Header />
    <Container id="main-body">
      <Switch>
        <Route path="/" exact component={PostCardList} />
        <Route path="/posts" exact component={PostWrite} />
        <Route path="/posts/:id" exact component={PostDetail} />
        <EditProtectedRoute path="/posts/:id/edit" exact component={PostEdit} />
        <Route
          path="/posts/category/:categoryName"
          exact
          component={CategoryResult}
        />
        <Route path="/search/:searchTerm" exact component={Search} />
        <ProfileProtectedRoute
          path="/user/:userName/profile"
          exact
          component={Profile}
        />
        <Redirect from="*" to="/" />
      </Switch>
    </Container>
    <Footer />
  </>
);

export default MyRouter;
