import styles from 'css/index.css';

@ReactCssModules(styles, {allowMultiple:true})
class Header extends React.Component {
  render() {
    return (
      <div styleName="header">
			React音乐App
      </div>
    );
  }
}

export default Header;
