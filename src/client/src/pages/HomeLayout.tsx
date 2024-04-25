import styled from 'styled-components';
import {Navbar} from '../components';
import {Outlet} from 'react-router-dom';

const HomeLayout: React.FunctionComponent = () => {
    return (
        <Wrapper>
            <Navbar/>
            <section>
                <Outlet/>
            </section>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    section {
        padding: 1rem;
    }
`;

export default HomeLayout;