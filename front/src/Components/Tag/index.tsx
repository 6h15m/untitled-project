import React from 'react';
import styled from 'styled-components';
import { TagType } from '../../../../models/data.interface';

export const Tag = ({ tag: tag }: { tag: TagType }) => (
  <TagWrap>
    <div className="tag"># {tag.name}</div>
  </TagWrap>
);

const TagWrap = styled.div`
  .tag {
    color: #4c6ef5;
    margin-right: 0.4rem;
    font-size: 0.9em;
  }
`;
