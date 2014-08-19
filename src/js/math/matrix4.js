'use strict';

function Matrix4(
  n11, n12, n13, n14,
  n21, n22, n23, n24,
  n31, n32, n33, n34,
  n41, n42, n43, n44
) {
  this.elements = new Float32Array( 16 );

  var m = this.elements;

  m[  0 ] = ( n11 !== undefined ) ? n11 : 1;
  m[  4 ] = n12 || 0;
  m[  8 ] = n13 || 0;
  m[ 12 ] = n14 || 0;

  m[  1 ] = n21;
  m[  5 ] = ( n22 !== undefined ) ? n22 : 1;
  m[  9 ] = n23 || 0;
  m[ 13 ] = n24 || 0;

  m[  2 ] = n31;
  m[  6 ] = n32 || 0;
  m[ 10 ] = ( n33 !== undefined ) ? n33 : 1;
  m[ 14 ] = n34 || 0;

  m[  3 ] = n41;
  m[  7 ] = n42 || 0;
  m[ 11 ] = n43 || 0;
  m[ 15 ] = ( n44 !== undefined ) ? n44 : 1;
}

Matrix4.prototype.set = function(
  n11, n12, n13, n14,
  n21, n22, n23, n24,
  n31, n32, n33, n34,
  n41, n42, n43, n44
) {
  var m = this.elements;

  m[  0 ] = n11;
  m[  4 ] = n12;
  m[  8 ] = n13;
  m[ 12 ] = n14;

  m[  1 ] = n21;
  m[  5 ] = n22;
  m[  9 ] = n23;
  m[ 13 ] = n24;

  m[  2 ] = n31;
  m[  6 ] = n32;
  m[ 10 ] = n33;
  m[ 14 ] = n34;

  m[  3 ] = n41;
  m[  7 ] = n42;
  m[ 11 ] = n43;
  m[ 15 ] = n44;

  return this;
};

Matrix4.prototype.copy = function( m ) {
  this.elements.set( m.elements );
  return this;
};

Matrix4.prototype.identity = function() {
  this.set(
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  );

  return this;
};

Matrix4.prototype.setPosition = function( v ) {
  var m = this.elements;

  m[ 12 ] = v.x;
  m[ 13 ] = v.y;
  m[ 14 ] = v.z;

  return this;
};

Matrix4.prototype.multiplyScalar = function ( s ) {
  var m = this.elements;

  m[  0 ] *= s;
  m[  4 ] *= s;
  m[  8 ] *= s;
  m[ 12 ] *= s;
  m[  1 ] *= s;
  m[  5 ] *= s;
  m[  9 ] *= s;
  m[ 13 ] *= s;
  m[  2 ] *= s;
  m[  6 ] *= s;
  m[ 10 ] *= s;
  m[ 14 ] *= s;
  m[  3 ] *= s;
  m[  7 ] *= s;
  m[ 11 ] *= s;
  m[ 15 ] *= s;

  return this;
};

Matrix4.prototype.getInverse = function ( m ) {
  // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
  var te = this.elements;
  var me = m.elements;

  var n11 = me[ 0 ], n12 = me[ 4 ], n13 = me[  8 ], n14 = me[ 12 ];
  var n21 = me[ 1 ], n22 = me[ 5 ], n23 = me[  9 ], n24 = me[ 13 ];
  var n31 = me[ 2 ], n32 = me[ 6 ], n33 = me[ 10 ], n34 = me[ 14 ];
  var n41 = me[ 3 ], n42 = me[ 7 ], n43 = me[ 11 ], n44 = me[ 15 ];

  te[  0 ] = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44;
  te[  4 ] = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44;
  te[  8 ] = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44;
  te[ 12 ] = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
  te[  1 ] = n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44;
  te[  5 ] = n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44;
  te[  9 ] = n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44;
  te[ 13 ] = n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34;
  te[  2 ] = n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44;
  te[  6 ] = n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44;
  te[ 10 ] = n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44;
  te[ 14 ] = n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34;
  te[  3 ] = n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43;
  te[  7 ] = n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43;
  te[ 11 ] = n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43;
  te[ 15 ] = n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33;

  var det = n11 * te[ 0 ] + n21 * te[ 4 ] + n31 * te[ 8 ] + n41 * te[ 12 ];

  if ( !det ) {
    this.identity();
    return this;
  }

  this.multiplyScalar( 1 / det );
  return this;
};

Matrix4.prototype.multiplyMatrices = function ( a, b ) {
  var ae = a.elements;
  var be = b.elements;
  var m = this.elements;

  var a11 = ae[ 0 ], a12 = ae[ 4 ], a13 = ae[  8 ], a14 = ae[ 12 ];
  var a21 = ae[ 1 ], a22 = ae[ 5 ], a23 = ae[  9 ], a24 = ae[ 13 ];
  var a31 = ae[ 2 ], a32 = ae[ 6 ], a33 = ae[ 10 ], a34 = ae[ 14 ];
  var a41 = ae[ 3 ], a42 = ae[ 7 ], a43 = ae[ 11 ], a44 = ae[ 15 ];

  var b11 = be[ 0 ], b12 = be[ 4 ], b13 = be[  8 ], b14 = be[ 12 ];
  var b21 = be[ 1 ], b22 = be[ 5 ], b23 = be[  9 ], b24 = be[ 13 ];
  var b31 = be[ 2 ], b32 = be[ 6 ], b33 = be[ 10 ], b34 = be[ 14 ];
  var b41 = be[ 3 ], b42 = be[ 7 ], b43 = be[ 11 ], b44 = be[ 15 ];

  m[  0 ] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
  m[  4 ] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
  m[  8 ] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
  m[ 12 ] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

  m[  1 ] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
  m[  5 ] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
  m[  9 ] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
  m[ 13 ] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

  m[  2 ] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
  m[  6 ] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
  m[ 10 ] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
  m[ 14 ] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

  m[  3 ] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
  m[  7 ] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
  m[ 11 ] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
  m[ 15 ] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

  return this;
};

Matrix4.prototype.makeRotationFromQuaternion = function( q ) {
  var m = this.elements;

  var x = q.x, y = q.y, z = q.z, w = q.w;
  var x2 = x + x, y2 = y + y, z2 = z + z;
  var xx = x * x2, xy = x * y2, xz = x * z2;
  var yy = y * y2, yz = y * z2, zz = z * z2;
  var wx = w * x2, wy = w * y2, wz = w * z2;

  m[ 0 ] = 1 - ( yy + zz );
  m[ 4 ] = xy - wz;
  m[ 8 ] = xz + wy;

  m[ 1 ] = xy + wz;
  m[ 5 ] = 1 - ( xx + zz );
  m[ 9 ] = yz - wx;

  m[  2 ] = xz - wy;
  m[  6 ] = yz + wx;
  m[ 10 ] = 1 - ( xx + yy );

  // last column
  m[  3 ] = 0;
  m[  7 ] = 0;
  m[ 11 ] = 0;

  // bottom row
  m[ 12 ] = 0;
  m[ 13 ] = 0;
  m[ 14 ] = 0;
  m[ 15 ] = 1;

  return this;
};

module.exports = Matrix4;