ReactTapEventPlugin();
import App from './app';
import {store} from 'reduxd/createStore.js';
const {Provider} = ReactRedux;

const $root = (() => {
	ReactDom.render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('root')
	)
})()

store.subscribe(() => {
	$root
})

