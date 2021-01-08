import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import Main from '../layouts/Main';
import { data } from '../data/blog';

const Blog = () => {
  return (
    <Main>
      <Helmet title="Blog" />
      <article className="post" id="blog">
        <header>
          <div className="title">
            <h2><Link to="/blog">Blog Posts</Link></h2>
          </div>
        </header>
        {data.map((post) => (
          <ul className="blog-toc" key={post.title}>
            <li>{formatDate(post.date)} - <a href={post.link}>{post.title}</a></li>
          </ul>
        ))}
      </article>
    </Main>
  );
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr).toString();
  return `${date.split(' ')[1]} ${date.split(' ')[3]}`
}

export default Blog;
