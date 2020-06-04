## emily-lcu-connector

### Install

<code>
npm i emily-lcu-connector
</code>

### Usage

#### JavaScript

##### Auto accept
```javascript
const lcu = require('emily-lcu-connector');

async function main() {
	await lcu.Client.connect();

	const listener = await lcu.Client.listenForEvents();
	
	listener.on('onReadyCheck',readyCheck=>{
		if (!readyCheck.replied) {
			readyCheck.accept();
		}
	});

}

main();
```


##### Change status message
```javascript
const lcu = require('emily-lcu-connector');

async function main() {
	await lcu.Client.connect();
	const me = await lcu.Client.getLocalPlayer();
	me.setStatusMessage('AYAYA!')
}

main();
```

##### Clear friend list

```javascript
const lcu = require('emily-lcu-connector');

async function main() {
	await lcu.Client.connect();
	const friends = await lcu.Client.getFriends();
	friends.forEach(friend =>{
		await friend.remove();
	})
}

main();
```

##### Generic event listener

```javascript
const lcu = require('emily-lcu-connector');

async function main() {
	await lcu.Client.connect();
	const listener = await lcu.Client.listenForEvents();
	listener.on('*',(data,event,uri)=>{
		//something
	});
}

main();
```