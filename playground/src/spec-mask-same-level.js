(() => {
  const { cc, app, dgui } = window;
  const { resl, path } = cc;

  // const glob = require('glob');
  // const path_ = require('path');


  // let scene_name;
  // let pattern = 'E:/github/load-level/out/*.json';
  // let a = glob(pattern, { nodir: true }, function (err, files) {
  //   if (err)
  //     console.log(err);
  //   else{
  //     for(let i=0;i<files.length;i++){
  //       if(files[i] != 'E:/github/load-level/out/assets.json'){
  //         scene_name = path_.basename(files[i],'.json');
  //         console.log('+++++++++++++',scene_name);
  //         return scene_name;
  //       }
  //     }
  //   }
  // })
  let dobj = {
    baseUrl: 'http://192.168.52.25:8002/out',
    scene: 'spec-mask-same-level',
    load: load,
  };
  dgui.remember(dobj);
  dgui.add(dobj, 'baseUrl').onFinishChange(() => {
    load();
  });
  dgui.add(dobj, 'scene').onFinishChange(() => {
    load();
  });
  dgui.add(dobj, 'load');

  load();

  function load() {
    resl({
      manifest: {
        assetInfos: {
          type: 'text',
          parser: JSON.parse,
          src: `${dobj.baseUrl}/assets.json`
        },

        scene: {
          type: 'text',
          parser: JSON.parse,
          src: `${dobj.baseUrl}/${dobj.scene}.json`
        },
      },

      onDone(data) {
        const sceneJson = data.scene;
        const assetInfos = data.assetInfos;

        for (let uuid in assetInfos) {
          let info = assetInfos[uuid];
          for (let item in info.urls) {
            info.urls[item] = path.join(dobj.baseUrl, info.urls[item]);
          }

          app.assets.registerAsset(uuid, info);
        }

        cc.utils.parseLevel(
          app,
          sceneJson,
          (err, level) => {
            app.loadLevel(level);
          }
        );
      }
    });
  }
})();