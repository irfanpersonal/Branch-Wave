import React from 'react';
import styled from 'styled-components';
import {type LinkType} from '../features/link/linkSlice';
import {PaginationBox, LinkListItem} from '../components';
import {nanoid} from 'nanoid';

interface LinkListProps {
    data: LinkType[],
    totalLinks: number,
    numberOfPages: number,
    page: number,
    changePage: Function,
    updateSearch: Function,
    _id?: string,
    editable?: boolean
}

const LinkList: React.FunctionComponent<LinkListProps> = ({data, totalLinks, numberOfPages, page, changePage, updateSearch, _id, editable}) => {
    return (
        <Wrapper>
            <h1 className="no-links">{totalLinks < 1 && 'No Links'}</h1>
            <section>
                {data.map(item => {
                    return (
                        <LinkListItem key={item.id} data={item} editable={editable!}/>
                    );
                })}
            </section>
            <div style={{marginTop: '1.25rem'}}>
                {numberOfPages! > 1 && (
                    <PaginationBox numberOfPages={numberOfPages!} page={page} changePage={changePage} updateSearch={updateSearch} _id={_id}/>
                )}
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.section`
    .no-links {
        text-decoration: underline;
    }
`;

export default LinkList;