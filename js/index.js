function init(){
    var stats = initStats();
    //creation de rendu et de la taille
    let rendu = new THREE.WebGLRenderer({ antialias: true});
    rendu.shadowMap.enabled = true;
    rendu.setClearColor(new THREE.Color(0xFFFFFF));
    rendu.setSize(window.innerWidth*.9, window.innerHeight*.9);

    // ajoute le rendu dans l'element HTML
    document.getElementById("webgl").appendChild(rendu.domElement);

    //camera
    let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    let controls = new THREE.OrbitControls(camera, rendu.domElement);
    camera.position.set(50, 10, 0);

    let scene = new THREE.Scene();
    
    //lumiere
    const light = new THREE.DirectionalLight(0xFFFFFF, 2);
    light.position.set(-1, 50, 50);// mettre la position de la lumiere en fonction de la position camera
    scene.add(light);


    /*AIDE

    //affichage des axes
    var axes = new THREE.AxesHelper(50);
    scene.add(axes);
    //affichage de la grille
    const gridHelper = new THREE.GridHelper(50,50);
    scene.add(gridHelper);

    //FIN AIDE*/

    //DECOR

    //piste de bowling
    const geometrypb = new THREE.PlaneGeometry( 100, 5 );
    const materialpb = new THREE.MeshPhysicalMaterial( {color: 0xda7c00, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometrypb, materialpb );
    plane.rotateX(Math.PI/2);
    plane.position.set(-25, 0, 0);
    scene.add( plane );
    //goutiere
    const geometryg = new THREE.CylinderGeometry(0.75, 0.75, 100, 32, 32, true, 0, Math.PI);
    const materialg = new THREE.MeshStandardMaterial( {color: 0xf0f0f0, metalness: 1, side: THREE.DoubleSide} );
    //droite
    const cylinderD = new THREE.Mesh( geometryg, materialg );
    cylinderD.position.set(-25, 0, -3.25);
    cylinderD.rotateZ(Math.PI/2);
    cylinderD.rotateY(2*Math.PI/2);
    scene.add( cylinderD );
    //gauche
    const cylinderG = new THREE.Mesh( geometryg, materialg );
    cylinderG.position.set(-25, 0, 3.25);
    cylinderG.rotateZ(Math.PI/2);
    cylinderG.rotateY(2*Math.PI/2);
    scene.add( cylinderG );

    //FIN DECOR


    //OBJET

    function PtsCourbePara(R,nb){
        let points = new Array(nb+1);
         // cercle
        for(var k=0;k<=nb;k++){
            let t2=k/nb*2*Math.PI; 
            t2=t2.toPrecision(100);
            let x0=R*Math.cos(t2);
            let y0=R*Math.sin(t2);    
            points[k] = new THREE.Vector3(x0,y0,0);
        }
        let PtsCbePara = new THREE.BufferGeometry().setFromPoints(points);
        return PtsCbePara;
    }// fin PtsCourbePara

    //boule de bowling
            /*const materialbb = new THREE.MeshPhongMaterial( { color: 0xff00ff, side: THREE.DoubleSide} );
            const materialcercle = new THREE.LineBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide});

            const geometrybb = new THREE.SphereGeometry( 0.55, 21, 16 );
            const cercleGeo = PtsCourbePara(0.6, 20);

            const sphereB = new THREE.Mesh( geometrybb, materialbb );
            const cercle = new THREE.Line(cercleGeo, materialcercle);

            const sphere = new THREE.Group();
            sphere.add(sphereB, cercle);
            sphere.position.set(25, 1, 0);
            scene.add( sphere );*/
        
        const materialbb = new THREE.MeshPhongMaterial( { color: 0x00ff00, side: THREE.DoubleSide} );
        const materialcercle = new THREE.LineBasicMaterial({ color: 0xff00ff, side: THREE.DoubleSide});

        const geometrybb = new THREE.SphereGeometry( 0.55, 21, 16 );
        const cercleGeo = PtsCourbePara(0.6, 20);

        const sphereB = new THREE.Mesh( geometrybb, materialbb );
        const cercle = new THREE.Line(cercleGeo, materialcercle);

        const sphere = new THREE.Group();
        sphere.add(sphereB, cercle);
        sphere.position.set(25, 1, 0);

       scene.add(sphere);
    

    function latheBez3(nbePtCbe,nbePtRot,P0,P1,P2,P3,coul){
        //let geometry = new THREE.Geometry();
        let p0= new THREE.Vector2(P0.x,P0.y);
        let p1= new THREE.Vector2(P1.x,P1.y);
        let p2= new THREE.Vector2(P2.x,P2.y);
        let p3= new THREE.Vector2(P3.x,P3.y);
        let Cbe3 = new THREE.CubicBezierCurve(p0,p1,p2,p3);
        let points = Cbe3.getPoints(nbePtCbe);
        let latheGeometry = new THREE.LatheGeometry(points,nbePtRot,0,2*Math.PI);
        let latheMaterial = new THREE.LineBasicMaterial({color: coul});
        let lathe = new THREE.Line(latheGeometry, latheMaterial);
        return lathe;
       }// fin latheBez3
       
       //quille
       function quille(CoulHexa, apparance, positionX, positionZ){
       
       if (apparance == true) {
        let coef = 1;
        let origine = new THREE.Vector3(0,0,0);
        let H0 = new THREE.Vector3(0,-0.3,0);
        let H1 = new THREE.Vector3(0.38,-0.3,0);
        let H2 = new THREE.Vector3(0.38,0.4,0);
        let H3 = new THREE.Vector3(0.36,0.6,0);
       
        let P0 = new THREE.Vector3(H3.x,H3.y,0);
        let P1 = new THREE.Vector3(H3.x,1.06,0);
        let P2 = new THREE.Vector3(0.15 ,1.443,0);
        let P3 = new THREE.Vector3(0.15,1.443,0);
        
        let M0 = new THREE.Vector3(P3.x,P3.y,0);
        let M1 = new THREE.Vector3(0.7,1.443,0);
        let M2 = new THREE.Vector3(0.15,1.788,0);
        let M3 = new THREE.Vector3(0.15,1.8,0);
        
        let I0 = new THREE.Vector3(M3.x,M3.y,0);
        let I1 = new THREE.Vector3(0.15,1.893,0);
        let I2 = new THREE.Vector3(0.3,2.352,0);
        let I3 = new THREE.Vector3(0,2.352,0); 
        
        let vP2P3 = new THREE.Vector3(0,0,0);
        let vTan2 = new THREE.Vector3(0,0,0);
       
        vP2P3.subVectors(H3,H2);//P3-P2
        vTan2.addScaledVector(vP2P3,coef);
        P1.addVectors(P0,vTan2);
       
        vP2P3.subVectors(P3,P2);//P3-P2
        vTan2.addScaledVector(vP2P3,coef);
        M1.addVectors(M0,vTan2);
       
        vP2P3.subVectors(M3,M2);//P3-P2
        vTan2.addScaledVector(vP2P3,coef);
        I1.addVectors(I0,vTan2);
       
        let nb=1000;//nmbre de pts par courbe
        let epai=4;//epaisseur de la courbe
        let nbPtCB=100;//nombre de points sur la courbe de Bezier
        let nbePtRot=300;// nbe de points sur les cercles
        
        let latheH = latheBez3(nbPtCB,nbePtRot,H0,H1,H2,H3,0xFF0000);
        let latheP = latheBez3(nbPtCB,nbePtRot,P0,P1,P2,P3,0xFFFFFF);
        let latheM = latheBez3(nbPtCB,nbePtRot,M0,M1,M2,M3,CoulHexa);
        let latheI = latheBez3(nbPtCB,nbePtRot,I0,I1,I2,I3,0x0000FF);
       
        var quille = new THREE.Group();
        quille.add(latheH);
        quille.add(latheP);
        quille.add(latheM);
        quille.add(latheI);
        quille.position.y = 0.3;
        quille.position.x = positionX;
        quille.position.z = positionZ;
       
        return quille;
        }
        
        else{
        const geometry = new THREE.BoxGeometry( 0.8, 0.1, 0.1 );
        const material = new THREE.MeshBasicMaterial( {color: CoulHexa} );
        const cube = new THREE.Mesh( geometry, material );
        cube.position.x = 0.4;
        return cube;
        }
       
       }

       //Placement des Quilles
       function Placement(){
            scene.add(quille(0x000000, true, -74, 2));
            scene.add(quille(0x000000, true, -74, 0.75));
            scene.add(quille(0x000000, true, -74, -0.75));
            scene.add(quille(0x000000, true, -74, -2));
            scene.add(quille(0x000000, true, -73, -1.25));
            scene.add(quille(0x000000, true, -73, 0));
            scene.add(quille(0x000000, true, -73, 1.25));
            scene.add(quille(0x000000, true, -72, -0.5));
            scene.add(quille(0x000000, true, -72, 0.5));
            scene.add(quille(0x000000, true, -71, 0));
       }
       Placement();

    //FIN OBJET


    //TRAJECTOIRE

    function TraceBezierQuadratique(P0, P1, P2, nbPts,coul,epaiCbe,c){
        let cbeBez = new THREE.QuadraticBezierCurve3(P0, P1, P2);
        let cbeGeometry = new THREE.Geometry();
        cbeGeometry.vertices = cbeBez.getPoints(nbPts);
        if(c==1){
            Tabpoint1 = cbeGeometry.vertices;
        }
        else{
            Tabpoint2 = cbeGeometry.vertices;
        }
        let material = new THREE.LineBasicMaterial( 
          { color : coul , 
            linewidth: epaiCbe    
          } );
        let BezierQuadratique = new THREE.Line( cbeGeometry, material );
        return (BezierQuadratique);
    }  // fin fonction THREE.QuadratiBezierCurve

    
    //coubre
    D = new THREE.Vector3(25,0,0);
    M = new THREE.Vector3(13,0,0);
    G1 = new THREE.Vector3(0,0,0);
    M1 = new THREE.Vector3(-13,0,0);
    F = new THREE.Vector3(-75,0,0);
    c1 = TraceBezierQuadratique (D,M,G1, 100, 0xFF0000, 5,1);
    c2 = TraceBezierQuadratique (G1, M1,F, 100, 0x0000FF, 5,2);
    scene.add(c1, c2);

    /*//Collision
    function collision(Obj1, Obj2){
        let firstBB = new THREE.Box3().setFromObject(Obj1);
        let secondBB = new THREE.Box3().setFromObject(Obj2);
        if (firstBB.intersectsBox(secondBB)){
            return true
        }
    }*/
    
    //Lancement de la boule de bowling
    function Tir(k){
        if(k<100){
            let p = Tabpoint1[k];
            sphere.position.set(p.x, 1, p.z);
        }
        else{
            if(k<200){
                let j = k-100;
                let p1 = Tabpoint2[j];
                sphere.position.set(p1.x, 1, p1.z);
                //if( collision(sphere, quille)){
                   // scene.remove(quille);
                //}
            }
        }
        setTimeout(Tir,20,k+1);   
        
    }

    //FIN TRAJECTOIRE

    /*JEU

    function jeu(){
        var j = 1;
        while (j <=4){
            var manche = false;
            var pts = 0;
            var qt = 0;
            if (j%2 == 0){
                materialbb.color = 0x00ff00;
                materialcercle.color = 0xff00ff;
                while(manche == false){
                    qt += Math.floor( Math.random()*(11));
                    l = 1;
                    while (l<=2){
                        if (l == 1 && qt == 10){
                            l=3;
                            manche = true;
                            pts += 30;
                            if(j%4 == 0){
                                l2 = document.GetElementById("l2m2E2");
                                l2.innerHTML = pts;
                            }
                            else{
                                l2 = document.GetElementById("l2m1E2");
                                l2.innerHTML = pts;
                            }
                        }
                        else{
                            if(l == 2 && qt == 10){
                                l = 3;
                                manche = true;
                                pts += 15;
                                if(j%4 == 0){
                                    l2 = document.GetElementById("l2m2E2");
                                    l2.innerHTML = pts;
                                }
                                else{
                                    l2 = document.GetElementById("l2m1E2");
                                    l2.innerHTML = pts;
                                }
                            }
                            else{
                                pts += qt;
                                if(l == 2){
                                    manche = true;  
                                    if(j%4 == 0){
                                        l2 = document.GetElementById("l2m2E2");
                                        l2.innerHTML = pts;
                                    }
                                    else{
                                        l2 = document.GetElementById("l2m1E2");
                                        l2.innerHTML = pts;
                                    }
                                }
                                else{
                                    if(j%4 == 0){
                                        l1 = document.GetElementById("l1m2E2");
                                        l1.innerHTML = pts;
                                    }
                                    else{
                                        l1 = document.GetElementById("l1m1E2");
                                        l1.innerHTML = pts;
                                    }
                                    l+=1;
                                }
                            }
                        }
                    }
                }
            }
            else{
                materialbb.color = 0xff00ff;
                materialcercle.color = 0x00ff00;
                while(manche == false){
                    qt += Math.floor( Math.random()*(11));
                    l = 1;
                    while (l<=2){
                        if (l == 1 && qt == 10){
                            l=3;
                            manche = true;
                            pts += 30;
                            if(j%3 == 0){
                                l2 = document.GetElementById("l2m2E1");
                                l2.innerHTML = pts;
                            }
                            else{
                                l2 = document.GetElementById("l2m1E1");
                                l2.innerHTML = pts;
                            }
                        }
                        else{
                            if(l == 2 && qt == 10){
                                l = 3;
                                manche = true;
                                pts += 15;
                                if(j%3 == 0){
                                    l2 = document.GetElementById("l2m2E1");
                                    l2.innerHTML = pts;
                                }
                                else{
                                    l2 = document.GetElementById("l2m1E1");
                                    l2.innerHTML = pts;
                                }
                            }
                            else{
                                pts += qt;
                                if(l == 2){
                                    manche = true;  
                                    if(j%3 == 0){
                                        l2 = document.GetElementById("l2m2E1");
                                        l2.innerHTML = pts;
                                    }
                                    else{
                                        l2 = document.GetElementById("l2m1E1");
                                        l2.innerHTML = pts;
                                    }
                                }
                                else{
                                    if(j%4 == 0){
                                        l1 = document.GetElementById("l1m2E1");
                                        l1.innerHTML = pts;
                                    }
                                    else{
                                        l1 = document.GetElementById("l1m1E1");
                                        l1.innerHTML = pts;
                                    }
                                    l+=1;
                                }
                            }
                        }
                    }
                }
            }
            j += 1;
            Placement();
            sphere.position.x = 25;
        }
    }
*/

    //MENU GUI

    var gui = new dat.GUI();
    let menuGUI = new function(){
    this.boulePosition = 0;
    this.FinPosition = 0;
    this.PointControlePosition = 0;
    this.lancement = function(){ 
        Tir(0);
        //jeu();
    };
    this.actualisation = function (){
        reAffichage();
    }

    }
    trajectoireGui(gui, menuGUI, c1, c2, D, M, G1, M1, F, scene, sphere);
    menuGUI.actualisation();


    function trajectoireGui(gui, menuGUI, c1, c2,D,M,G1,M1,F, scene, boule){
        var T = gui.addFolder("Trajectoire");
        T.add(menuGUI, "boulePosition", -3.5, 3.5).onChange(function(){
            boule.position.z = menuGUI.boulePosition;
            if(c1) scene.remove(c1);
            if(c2) scene.remove(c2);
            D.setComponent(2, menuGUI.boulePosition);
            c1 = TraceBezierQuadratique (D,M,G1, 3, 0xFF0000, 5,1);
            c2 = TraceBezierQuadratique (G1, M1,F, 3, 0x0000FF, 5,2);
            scene.add(c1, c2);
        });
        T.add(menuGUI, "FinPosition", -3.5, 3.5).onChange(function(){
            if(c1) scene.remove(c1);
            if(c2) scene.remove(c2);
            F.setComponent(2, menuGUI.FinPosition);
            c1 = TraceBezierQuadratique (D,M,G1, 100, 0xFF0000, 5,1);
            c2 = TraceBezierQuadratique (G1, M1,F, 100, 0x0000FF, 5,2);
            scene.add(c1, c2);
        })
        T.add(menuGUI, "PointControlePosition", -4, 4).onChange(function(){
            if(c1) scene.remove(c1);
            if(c2) scene.remove(c2);
            M.setComponent(2, menuGUI.PointControlePosition);
            M1.setComponent(2, menuGUI.PointControlePosition*(-1));
            c1 = TraceBezierQuadratique (D,M,G1, 100, 0xFF0000, 5,1);
            c2 = TraceBezierQuadratique (G1, M1,F, 100, 0x0000FF, 5,2);
            scene.add(c1, c2);
        })
        T.add(menuGUI,"lancement");
    }

    //FIN MENUGUI




    function reAffichage() {
        setTimeout(function () {sphere.position}, 200);
        // fin setTimeout(function ()
        // rendu avec requestAnimationFrame
        rendu.render(scene, camera);
    }
    // fin fonction reAffichage()*/

    //affichage de la scene
    function renduAnim() {
        stats.update();
        controls.update();
        // rendu avec requestAnimationFrame
        requestAnimationFrame(renduAnim);
        // ajoute le rendu dans l'element HTML
        rendu.render(scene, camera);
    }
    renduAnim();
}