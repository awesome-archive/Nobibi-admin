import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Icon, Input } from 'antd'
import { GlobalFooter } from 'ant-design-pro'
import { Trans, withI18n } from '@lingui/react'
import { setLocale } from 'utils'
import config from 'utils/config'

import styles from './index.less'
const FormItem = Form.Item

@withI18n()
@connect(({ loading }) => ({ loading }))
@Form.create()
class Login extends PureComponent {
  handleOk = () => {
    const { dispatch, form } = this.props
    const { validateFieldsAndScroll } = form
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      // dispatch({ type: 'login/login', payload: {params: values} })
      dispatch({ type: 'login/login', payload: values })
    })
  }

  render() {
    const { loading, form, i18n } = this.props
    const { getFieldDecorator } = form

    let footerLinks = [
      {
        key: 'github',
        title: <Icon type="github" />,
        href: 'https://github.com/zuiidea/antd-admin',
        blankTarget: true,
      },
    ]

    if (config.i18n) {
      footerLinks = footerLinks.concat(
        config.i18n.languages.map(item => ({
          key: item.key,
          title: (
            <span onClick={setLocale.bind(null, item.key)}>{item.title}</span>
          ),
        }))
      )
    }

    return (
      <Fragment>
        <div className={styles.form}>
          <div className={styles.logo}>
            <img alt="logo" src={config.logoPath} />
            <span>{config.siteName}</span>
          </div>
          <form>
            <FormItem hasFeedback>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Input
                  onPressEnter={this.handleOk}
                  placeholder={i18n.t`Name`}
                />
              )}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Input
                  type="password"
                  onPressEnter={this.handleOk}
                  placeholder={i18n.t`Password`}
                />
              )}
            </FormItem>
            <Row>
              <Button
                type="primary"
                onClick={this.handleOk}
                loading={loading.effects.login}
              >
                <Trans>Sign in</Trans>
              </Button>

              <p style={{ margin: '5px 0' }}>
                <span>
                  <Trans>Name</Trans>
                  ：admin
                </span>
                <span>
                  <Trans>Password</Trans>
                  ：123456
                </span>
              </p>
              <p style={{ margin: 0 }}>
                请先还原
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/seawind8888/Nobibi-api"
                >
                  Nobibi-api
                </a>
                数据库，再登录
              </p>
            </Row>
          </form>
        </div>
        <div className={styles.footer}>
          <GlobalFooter links={footerLinks} copyright={config.copyright} />
        </div>
      </Fragment>
    )
  }
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Login
