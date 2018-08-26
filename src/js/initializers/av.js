{

    let APP_ID = 'FiFXzVPNTVOlwrPIS85JO5hh-gzGzoHsz';
    let APP_KEY = 'mRUeyhQVHzOIt6au3tgwftFP';

    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });
    let {
        Realtime,
        TextMessage
    } = AV;
    // let TestObject = AV.Object.extend('Playlist');
    // let testObject = new TestObject();
    // testObject.save({
    //     name: 'test',
    //     cover: 'test',
    //     creatorId: 'test',
    //     description: 'test',
    //     songs: [1, 2]
    // }).then(function (object) {
    //     alert('LeanCloud Rocks!');
    // })
}