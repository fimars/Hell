import { siteData } from '@/.temp/siteData';
import * as React from 'react';
import { Link } from 'react-router-dom';

console.log(siteData);

export default () => (
  <div style={{width: '100%', lineHeight: '40px', display: 'flex', padding: '40px'}}>
    {
      siteData.pages.map(
        (page, idx) => 
          <Link key={idx} to={page.file} className="button link">
            <div>{page.file}</div>
          </Link>
      )
    }
  </div>
)