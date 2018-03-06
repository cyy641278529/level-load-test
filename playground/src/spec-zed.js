(() => {
  const { cc, app, dgui } = window;
  const { resl, path } = cc;
  let anims = ['attack1'];

  let dobj = {
    baseUrl: 'http://192.168.52.25:8002/out',
    scene: 'spec-zed',
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
            let ent = app.find('zed');
            let anim = ent.getComp('Animation');
            let anim_name = [];
            anim_name = anim.clips[Math.floor(Math.random()*anim.clips.length)]._name;
            anim.play(anim_name);
          }
        );

      }
    });
  }
})();