(() => {
  const { cc, app, dgui } = window;
  const { resl, path, async } = cc;
  const { quat, vec3 } = cc.math;

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
  let camEnt = app.createEntity('camera');
  vec3.set(camEnt.lpos, 10, 10, 10);
  camEnt.lookAt(vec3.new(0, 0, 0));
  camEnt.addComp('Camera');

  let screen = app.createEntity('screen');
  screen.addComp('Screen');
{
    // // create mesh
    // let meshBox = cc.utils.createMesh(app, cc.primitives.box(1, 1, 1, {
    //   widthSegments: 1,
    //   heightSegments: 1,
    //   lengthSegments: 1,
    // }));
  
    // //let meshSphere = cc.utils.createMesh()
  
    // // create material
    // let material = new cc.Material();
    // material.effect = app.assets.get('builtin-effect-pbr');
    // material.setProperty('roughness', 0.5);
    // material.setProperty('metallic', 1);
    // material.define('USE_SHADOW_MAP', true);

    // let ent = app.createEntity(`spec-test`);
    // vec3.set(ent.lpos,
    //   -5,//randomRange(-20, 20),
    //   5,//randomRange(0, 10),
    //   0//randomRange(0, 20)
    // );
    // quat.fromEuler(ent.lrot,
    //   30,//randomRange(0, 360),
    //   30,//randomRange(0, 360),
    //   30 //randomRange(0, 360)
    // );
    // vec3.set(ent.lscale,
    //   5,//randomRange(1, 5),
    //   5,//randomRange(1, 5),
    //   5//randomRange(1, 5)
    // );
    // let model = ent.addComp('Model');
    // model.mesh = meshBox;
    // model.material = material;
}

  resl({
    manifest: {
      assetInfos: {
        type: 'text',
        parser: JSON.parse,
        src: `E:/github/level-load-test/out/assets.json`
      },

      scene: {
        type: 'text',
        parser: JSON.parse,
        src: `E:/github/level-load-test/out/spec-script-simple.json`
      },
    },
    onDone(data) {
      const assetInfos = data.assetInfos;
      const sceneJson = data.scene;
      let info = assetInfos['b0ccbfd515e88684c849c6211e6763c4'];
      console.log(info.urls.mesh);
      info.urls.mesh = path.join('E:/github/level-load-test/out', info.urls.mesh);
      info.urls.bin = path.join('E:/github/level-load-test/out', info.urls.bin);
      app.assets.registerAsset('b0ccbfd515e88684c849c6211e6763c4', info);

      let spec = app.createEntity('spec-test');
      vec3.set(spec.lpos,
        -5,//randomRange(-20, 20),
        5,//randomRange(0, 10),
        0//randomRange(0, 20)
      );
      quat.fromEuler(spec.lrot,
        30,//randomRange(0, 360),
        30,//randomRange(0, 360),
        30 //randomRange(0, 360)
      );
      vec3.set(spec.lscale,
        5,//randomRange(1, 5),
        5,//randomRange(1, 5),
        5//randomRange(1, 5)
      );
      let spec_comp = spec.addComp('Model');
      app.assets.load('b0ccbfd515e88684c849c6211e6763c4', (err, asset) => {
        if (err) {
          console.error(err);
          return;
        }
        spec_comp.mesh = asset;
        console.log(spec_comp);
      })
      let material = new cc.Material();
      material.effect = app.assets.get('builtin-effect-pbr');
      material.setProperty('roughness', 0.5);
      material.setProperty('metallic', 1);
      material.define('USE_SHADOW_MAP', true);
      spec_comp.material = material;
      vec3.set(spec.lpos,
        0,//randomRange(-20, 20),
        0,//randomRange(0, 10),
        0//randomRange(0, 20)
      );
      vec3.set(spec.lscale,
        5,//randomRange(1, 5),
        5,//randomRange(1, 5),
        5//randomRange(1, 5)
      );
    }
  })
  {
    // let dobj = {
    //   baseUrl: 'http://192.168.52.25:8002/out',
    //   scene: 'spec-script-simple',
    //   load: load,
    // };
    // dgui.remember(dobj);
    // dgui.add(dobj, 'baseUrl').onFinishChange(() => {
    //   load();
    // });
    // dgui.add(dobj, 'scene').onFinishChange(() => {
    //   load();
    // });
    // dgui.add(dobj, 'load');

    // load();

    // function load() {
    //   resl({
    //     manifest: {
    //       assetInfos: {
    //         type: 'text',
    //         parser: JSON.parse,
    //         src: `E:/github/level-load-test/out/assets.json`
    //       },

    //       scene: {
    //         type: 'text',
    //         parser: JSON.parse,
    //         src: `E:/github/level-load-test/out/spec-script-simple.json`
    //       },
    //     },

    //     onDone(data) {
    //       const sceneJson = data.scene;
    //       const assetInfos = data.assetInfos;
    //       console.log(assetInfos['b0ccbfd515e88684c849c6211e6763c4']);
    //       for (let uuid in assetInfos) {
    //         let info = assetInfos[uuid];
    //         for (let item in info.urls) {
    //           info.urls[item] = path.join(dobj.baseUrl, info.urls[item]);
    //         }

    //         app.assets.registerAsset(uuid, info);
    //       }
    //       let spec = app.createEntity('spec-test');

    //       let spec_comp = spec.addComp('Model');
    //       app.assets.load('b0ccbfd515e88684c849c6211e6763c4', (err, asset) => {
    //         if (err) {
    //           console.error(err);
    //           return;
    //         }
    //         spec_comp.mesh = asset;
    //       })
    //       // cc.utils.parseLevel(
    //       //   app,
    //       //   sceneJson,
    //       //   (err, level) => {
    //       //     app.loadLevel(level);
    //       //   }
    //       // );
    //     }
    //   });
    // }
  }
})();