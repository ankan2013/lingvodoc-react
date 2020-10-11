import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, branch, renderNothing } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import { Dropdown, Menu, Button, List } from 'semantic-ui-react';
import styled from 'styled-components';
import config from 'config';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setIsAuthenticated } from 'ducks/auth';

import { getTranslation } from 'api/i18n';
import User from './User';
import Tasks from './Tasks';
import Locale from './Locale';

import './style.scss';

const Logo = styled.span`
  font-size: 1.4em;
  font-weight: bold;
`;

const SyncButton = ({ synchronize }) => (
  <Menu.Item>
    <Button color="purple" onClick={synchronize}>{getTranslation('Sync')}</Button>
  </Menu.Item>
);

SyncButton.propTypes = {
  synchronize: PropTypes.func.isRequired,
};

const Sync = compose(
  branch(() => config.buildType === 'server', renderNothing),
  graphql(gql`
      query isAuthenticatedProxy {
        is_authenticated
  }`),
  graphql(
    gql`
      mutation {
        synchronize {
          triumph
        }
      }
    `,
    { name: 'synchronize' }
  ),
  branch(({ data }) => data.loading || !data.is_authenticated, renderNothing),
)(SyncButton);


function openHelp() {
  window.open('https://github.com/ispras/lingvodoc-react/wiki', '_blank');
}

function openMapStorage() {
  window.open('https://github.com/ispras/lingvodoc-react/wiki/%D0%A5%D1%80%D0%B0%D0%BD%D0%B8%D0%BB%D0%B8%D1%89%D0%B5-%D0%BA%D0%B0%D1%80%D1%82', '_blank');
}

const NavBar =
  (props) => {
    const { data: { version } } = props;
    return (

      <Menu fixed="top" className="top_menu">
        <Menu.Item as={Link} to={config.homePath} className="top_menu">
          <Logo>Lingvodoc 3.0</Logo>
        </Menu.Item>

        <Dropdown item text={getTranslation('Maps')} className="top_menu">
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/map">
              {getTranslation('Map')}
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/map_search">
              {getTranslation('Search')}
            </Dropdown.Item>
            <Dropdown.Item onClick={openMapStorage}>
              {getTranslation('Storage')}
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/distance_map">
              {getTranslation('Distance map')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown item text={getTranslation('Info')} className="top_menu">
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/info">
              {getTranslation('Authors')}
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/desktop">
              {getTranslation('Desktop')}
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/languages">
              {getTranslation('Languages')}
            </Dropdown.Item>
            <Dropdown item text="Version">
              <Dropdown.Menu style={{ fontSize: '1.05rem' }} className="version">
                <Dropdown.Item className="version">
                  <List>
                    <List.Item className="version">
                      <p style={{ marginBottom: '0.5em' }}>Backend:</p>
                      <p style={{ marginLeft: '0.5em' }}>{version}</p>
                    </List.Item>
                    <List.Item className="version">
                      <p style={{ marginBottom: '0.5em' }}>Frontend:</p>
                      <p style={{ marginLeft: '0.5em' }}>{/* eslint-disable no-undef */__VERSION__ /* eslint-enable no-undef */}</p>
                    </List.Item>
                  </List>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Menu position="right">
          <Sync />
          <User />
          <Tasks />
          <Locale />
        </Menu.Menu>
      </Menu>
    );
  };


NavBar.propTypes = {
  data: PropTypes.object.isRequired,
};
export default compose(
  graphql(gql`
    query isAuthenticated {
      is_authenticated
    }
  `),
  connect(
    (state, { data }) => ({ ...state.auth }),
    (dispatch, { data }) => {
      dispatch(setIsAuthenticated({ isAuthenticated: data.is_authenticated }));

      return { actions: bindActionCreators({ setIsAuthenticated }, dispatch) };
    }
  ),
  graphql(gql`query version { version }`),
  withRouter,
)(NavBar);
