const HotKeyItem = ({itemName, data, slice, addQuery}) => {
	return (
		<ul>
			{
				data.length !== 0 &&
				data.slice(0, slice).map((item, index) => (
					<li className={itemName} key={item.n}>
		            		<span onClick={() => {addQuery && addQuery(item.k)}}>{item.k}</span>
		          	</li>
				))
			}
          
        </ul>
	)
}

export  {HotKeyItem};
