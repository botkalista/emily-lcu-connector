
import * as lcu from '../../index';

async function main() {

    await lcu.Client.connect();

    console.log('Client aperto')

    const me = await lcu.Client.getLocalPlayer();

    console.log(me.statusMessage)

    me.setStatusMessage('AYAYA')

    lcu.Client.listenForEvents()

}

main();
