import React from 'react';
import './styles/page.css';

// extract children prop only
function Page({children}) {
    return <section className="page">{children}</section>
}

export default Page;