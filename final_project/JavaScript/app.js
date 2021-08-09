
			document.addEventListener('DOMContentLoaded',render);
			var container;
			var camera, scene, renderer,camara2;
			camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
			//camera2 = new THREE.OrthographicCamera( window.innerWidth / - 100, window.innerWidth / 100, window.innerHeight / 100, window.innerHeight / -100, - 1000, 1000); 
			camera.position.set( 1000, 750, 3500 );
			var camaraRotation;
			var camaraAndar = {x:0, y:0, z:0};
			var velocidadeAndar = 100;
			var velocidadeRotation = 0.5;
			scene = new THREE.Scene();
			scene.background = new THREE.Color( 0xcce0ff );
			//scene.fog = new THREE.Fog( 0xcce0ff, 2500, 10000 );
			var relogio = new THREE.Clock();
			var renderer = new THREE.WebGLRenderer();
			var mixerAnimacao;
			var taxi = new THREE.FBXLoader();
			var wave =new THREE.FBXLoader();
			var object;
			var Animacao;
			var lightAmbient =new THREE.AmbientLight( 0x666666 );
			var lightDirectional = new THREE.DirectionalLight( 0xdfebff, 1 );
			
			
			var taxiObj;


			init();
			animate( 0 );
			
			function init() {

						container = document.createElement( 'div' );
						document.body.appendChild( container );

						


						// ground
						const loader = new THREE.TextureLoader();
						var groundTexture = loader.load( './Images/road.jpg' );
						groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
						groundTexture.repeat.set( 25, 25 );
						groundTexture.anisotropy = 16;
						groundTexture.encoding = THREE.sRGBEncoding;

						var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );

						var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
						mesh.position.y = - 250;
						mesh.rotation.x = - Math.PI / 2;
						mesh.receiveShadow = true;
						scene.add( mesh );





						//lights
						lightDirectional.position.set( 50, 200, 100 );
						lightDirectional.position.multiplyScalar( 1.3 );
						
						lightDirectional.castShadow = false;

						lightDirectional.shadow.mapSize.width = 1024;
						lightDirectional.shadow.mapSize.height = 1024;

						var d = 300;

						lightDirectional.shadow.camera.left = - d;
						lightDirectional.shadow.camera.right = d;
						lightDirectional.shadow.camera.top = d;
						lightDirectional.shadow.camera.bottom = - d;

						lightDirectional.shadow.camera.far = 1000;

						scene.add( lightDirectional );
						scene.add( lightAmbient );


						// objects

						var texture = new THREE.TextureLoader().load( './Texture/brick.jpg' );
						var base = new THREE.BoxBufferGeometry( 3000, 1500, 1500 );
						var material = new THREE.MeshStandardMaterial({ map: texture } );
						var mesh = new THREE.Mesh( base, material );
						mesh.position.y = - 162;
						mesh.position.x = 1125;
						mesh.position.z = -3125;
						mesh.receiveShadow = true;
						mesh.castShadow = true;
						mesh.TextureLoader
						scene.add( mesh );




						var texture2 = new THREE.TextureLoader().load( './Texture/roof.jpg' );
						var roof = new THREE.BoxBufferGeometry( 4000, 100, 3000 );
						var material = new THREE.MeshStandardMaterial({map: texture2});
						var mesh = new THREE.Mesh( roof, material );
						mesh.position.y = 590;
						mesh.position.x = 1125;
						mesh.position.z = -3625;
						mesh.receiveShadow = true;
						mesh.castShadow = true;
						scene.add( mesh );
						
						var porta = new THREE.BoxBufferGeometry(500, 700 ,200);
						var texture3 = new THREE.TextureLoader().load( './Texture/door.jpg' );
						var material = new THREE.MeshStandardMaterial({map: texture3});
						var mesh =new THREE.Mesh( porta, material );
						mesh.position.y = 10;
						mesh.position.x = 1125;
						mesh.position.z = -2470;
						mesh.receiveShadow = true;
						mesh.castShadow = true;
						mesh.TextureLoader
						scene.add( mesh );

						var sign = new THREE.BoxBufferGeometry(2, 5,2);
						var texture4 = new THREE.TextureLoader().load( './Texture/taxizone.jpg' );
						var material = new THREE.MeshStandardMaterial({map: texture4});
						var mesh =new THREE.Mesh( porta, material );
						mesh.position.y = 60;
						mesh.position.x = 100;
						mesh.position.z = -2470;
						
						mesh.scale.x = 1;
						mesh.scale.z =1;
						mesh.scale.y =1;

						mesh.receiveShadow = true;
						mesh.castShadow = true;
						mesh.TextureLoader
						scene.add( mesh );
				
				

						//imported objects

						//taxi
						
						taxi.load( './Objetos/taxi.FBX', function ( object ) {
							
							object.position.y = - 202;
							object.position.x = 5;
							object.position.z = -1025;

							object.rotation.y = 0.1;

							object.scale.x = 5;
							object.scale.z =5;
							object.scale.y =5;

							// save taxiObj reference
							taxiObj = object;

							scene.add( object );

						   var move ;

						  // object.position.x = move;



			} );


					// human waving

							wave.load('./Objetos/Waving.fbx', function(human) {

							mixerAnimacao = new THREE.AnimationMixer(human);
						
							var action = mixerAnimacao.clipAction(human.animations[0]);
							action.play();
						
							human.traverse (function(child){
								
								if(child.isMesh)
								{
									child.castShadow = true;
									child.receiverShadow = true;
								}
							
							});
						

							human.position.y = - 245;
							human.position.x = 1625;
							human.position.z = -2255;

							human.rotation.y = -0.5;

							human.scale.x = 2.5;
							human.scale.z =2.5;
							human.scale.y =2.5;

							scene.add(human);
						
							
						});


                
			
                

				// renderer

							renderer = new THREE.WebGLRenderer( { antialias: true } );
							renderer.setPixelRatio( window.devicePixelRatio );
							renderer.setSize( window.innerWidth, window.innerHeight );

							container.appendChild( renderer.domElement );

							renderer.outputEncoding = THREE.sRGBEncoding;

							renderer.shadowMap.enabled = true;
							
							requestAnimationFrame(update);
							

            
			}
					// mouse movement
					/*
					document.addEventListener('mousemove', ev=>{
						var x = (ev.clientX - 0) / (window.innerWidth - 0) * (1 - (-1)) + -1;
						var y = (ev.clientY - 0) / (window.innerHeight - 0) * (1 - (-1)) + -1;
						
						camaraRotation = {
							x:x,
							y:y
						}
					});
			*/

					document.body.appendChild(renderer.domElement);
					
					//object movment
					document.addEventListener('keydown', ev=>{
						
						
						console.log('taxiObj', taxiObj);
						if(ev.keyCode == 37) {
							taxiObj.position.x -= velocidadeAndar;
						}
					
						if(ev.keyCode == 39){
							taxiObj.position.x += velocidadeAndar;
						}
					
						
					});

						document.addEventListener('keyup', ev=>{
					
						
							
						
							if(ev.keyCode == 37)
							camera.position.x  -= velocidadeAndar;
						
							if(ev.keyCode == 39)
							camera.position.x  += velocidadeAndar;
						
							
						});


						//camera movement
						document.addEventListener('keydown', ev=>{
							var coords = {
								x:0,
								y:0,
								z:0
							};

							if(ev.keyCode == 87)//W-up
							camera.position.y += velocidadeAndar;

							if(ev.keyCode == 83)//S-down
							camera.position.y -= velocidadeAndar;

							if(ev.keyCode == 65)//A-rotate left
							camera.rotation.y -= velocidadeAndar;

							if(ev.keyCode == 68)//D-rotate right
							camera.rotation.y += velocidadeAndar;

							if(ev.keyCode == 82)//R-rotate up
							camera.rotation.x -= velocidadeAndar;

							if(ev.keyCode == 70)//F-rotate down
							camera.rotation.x += velocidadeAndar;


							if(ev.keyCode == 81)//Q-zoom out
							camera.position.z += velocidadeAndar;

							if(ev.keyCode == 69)//E-zoom in
							camera.position.z -= velocidadeAndar;



							if(ev.keyCode == 75)//K-change camara
							{
							camera = new THREE.OrthographicCamera( window.innerWidth / - 0.1, window.innerWidth / 0.1, window.innerHeight / 0.1, window.innerHeight / -0.1,  -500, 1000); 
							camera.rotation.y = 1;
							camara.position.y =200;
							scene.add(camara);
							}
							
							if(ev.keyCode == 76)//L-set camara
							{
							camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
							camera.position.set( 1000, 750, 3500 );
							scene.add(camara);
							

							}

							camaraAndar = coords;
						});




						document.addEventListener('keydown', ev=>{
											
										
											
							if(ev.keyCode == 90)//Z
								//directional turn on
								lightDirectional.visible = true ;
								
								
							if(ev.keyCode == 88)//X
							//ambient turn on
							
								lightAmbient.visible = true;

							if(ev.keyCode == 67)//C
							// direction turn off

								lightDirectional.visible = false;

							if(ev.keyCode == 86)//V
							// ambient turn off
								
								lightAmbient.visible = false;


						});
						

							document.addEventListener('wheel', ev=>{

								camera.position.z += ev.deltaY * 0.1;
							
							
							
							
							});
							
							window.addEventListener('resize', ev=>{
							
								const width = window.innerWidth;
								const height = window.innerHeight;
							
								windowHalf.set(width / 2, height / 2);
							
								camera.aspect = width / height;
								camera.updateProjectionMatrix();
								renderer.setSize(width, height);
							
							
							
							});
							
								function onWindowResize() {

									camera.aspect = window.innerWidth / window.innerHeight;
									camera.updateProjectionMatrix();

									renderer.setSize( window.innerWidth, window.innerHeight );

								}



			
						function update(){
				
							if(camaraRotation != null)
							{
								camera.rotation.x += camaraRotation.y * 0.001;
								camera.rotation.y += camaraRotation.x * 0.001;
							}


							
						
							if(camaraAndar != null)
							{
								camera.position.x += camaraAndar.x;
								camera.position.z += camaraAndar.z;
							}
						
							if(mixerAnimacao){
								mixerAnimacao.update(relogio.getDelta());
							}
						
							camaraAndar = {x:0, y:0, z:0};;
							
							renderer.render(scene, camera);
							
							requestAnimationFrame(update);
						}

						
						

						function animate( now ) {
							
							requestAnimationFrame(update);
							requestAnimationFrame( animate );
							
							render();
							

						}

						function render() {

							

							renderer.render( scene, camera );

						}
						



			