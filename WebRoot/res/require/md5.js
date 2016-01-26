define(function ($) {
	function MD5(){
		this.Md5 = {
			hexcase : 1,
			b64pad : "",
			chrsz : 8,
			mode : 32,
			md5:function(A){
				return this.hex_md5(A);
			},
			hex_md5:function(A) {
				return this.binl2hex(this.core_md5(this.str2binl(A), A.length * this.chrsz))
			},
			str_md5:function(A) {
				return this.binl2str(this.core_md5(this.str2binl(A), A.length * this.chrsz))
			},
			core_md5:function(K, F) {
				K[F >> 5] |= 128 << ((F) % 32);
				K[(((F + 64) >>> 9) << 4) + 14] = F;
				var J = 1732584193;
				var I = -271733879;
				var H = -1732584194;
				var G = 271733878;
				for (var C = 0; C < K.length; C += 16) {
					var E = J;
					var D = I;
					var B = H;
					var A = G;
					J = this.md5_ff(J, I, H, G, K[C + 0], 7, -680876936);
					G = this.md5_ff(G, J, I, H, K[C + 1], 12, -389564586);
					H = this.md5_ff(H, G, J, I, K[C + 2], 17, 606105819);
					I = this.md5_ff(I, H, G, J, K[C + 3], 22, -1044525330);
					J = this.md5_ff(J, I, H, G, K[C + 4], 7, -176418897);
					G = this.md5_ff(G, J, I, H, K[C + 5], 12, 1200080426);
					H = this.md5_ff(H, G, J, I, K[C + 6], 17, -1473231341);
					I = this.md5_ff(I, H, G, J, K[C + 7], 22, -45705983);
					J = this.md5_ff(J, I, H, G, K[C + 8], 7, 1770035416);
					G = this.md5_ff(G, J, I, H, K[C + 9], 12, -1958414417);
					H = this.md5_ff(H, G, J, I, K[C + 10], 17, -42063);
					I = this.md5_ff(I, H, G, J, K[C + 11], 22, -1990404162);
					J = this.md5_ff(J, I, H, G, K[C + 12], 7, 1804603682);
					G = this.md5_ff(G, J, I, H, K[C + 13], 12, -40341101);
					H = this.md5_ff(H, G, J, I, K[C + 14], 17, -1502002290);
					I = this.md5_ff(I, H, G, J, K[C + 15], 22, 1236535329);
					J = this.md5_gg(J, I, H, G, K[C + 1], 5, -165796510);
					G = this.md5_gg(G, J, I, H, K[C + 6], 9, -1069501632);
					H = this.md5_gg(H, G, J, I, K[C + 11], 14, 643717713);
					I = this.md5_gg(I, H, G, J, K[C + 0], 20, -373897302);
					J = this.md5_gg(J, I, H, G, K[C + 5], 5, -701558691);
					G = this.md5_gg(G, J, I, H, K[C + 10], 9, 38016083);
					H = this.md5_gg(H, G, J, I, K[C + 15], 14, -660478335);
					I = this.md5_gg(I, H, G, J, K[C + 4], 20, -405537848);
					J = this.md5_gg(J, I, H, G, K[C + 9], 5, 568446438);
					G = this.md5_gg(G, J, I, H, K[C + 14], 9, -1019803690);
					H = this.md5_gg(H, G, J, I, K[C + 3], 14, -187363961);
					I = this.md5_gg(I, H, G, J, K[C + 8], 20, 1163531501);
					J = this.md5_gg(J, I, H, G, K[C + 13], 5, -1444681467);
					G = this.md5_gg(G, J, I, H, K[C + 2], 9, -51403784);
					H = this.md5_gg(H, G, J, I, K[C + 7], 14, 1735328473);
					I = this.md5_gg(I, H, G, J, K[C + 12], 20, -1926607734);
					J = this.md5_hh(J, I, H, G, K[C + 5], 4, -378558);
					G = this.md5_hh(G, J, I, H, K[C + 8], 11, -2022574463);
					H = this.md5_hh(H, G, J, I, K[C + 11], 16, 1839030562);
					I = this.md5_hh(I, H, G, J, K[C + 14], 23, -35309556);
					J = this.md5_hh(J, I, H, G, K[C + 1], 4, -1530992060);
					G = this.md5_hh(G, J, I, H, K[C + 4], 11, 1272893353);
					H = this.md5_hh(H, G, J, I, K[C + 7], 16, -155497632);
					I = this.md5_hh(I, H, G, J, K[C + 10], 23, -1094730640);
					J = this.md5_hh(J, I, H, G, K[C + 13], 4, 681279174);
					G = this.md5_hh(G, J, I, H, K[C + 0], 11, -358537222);
					H = this.md5_hh(H, G, J, I, K[C + 3], 16, -722521979);
					I = this.md5_hh(I, H, G, J, K[C + 6], 23, 76029189);
					J = this.md5_hh(J, I, H, G, K[C + 9], 4, -640364487);
					G = this.md5_hh(G, J, I, H, K[C + 12], 11, -421815835);
					H = this.md5_hh(H, G, J, I, K[C + 15], 16, 530742520);
					I = this.md5_hh(I, H, G, J, K[C + 2], 23, -995338651);
					J = this.md5_ii(J, I, H, G, K[C + 0], 6, -198630844);
					G = this.md5_ii(G, J, I, H, K[C + 7], 10, 1126891415);
					H = this.md5_ii(H, G, J, I, K[C + 14], 15, -1416354905);
					I = this.md5_ii(I, H, G, J, K[C + 5], 21, -57434055);
					J = this.md5_ii(J, I, H, G, K[C + 12], 6, 1700485571);
					G = this.md5_ii(G, J, I, H, K[C + 3], 10, -1894986606);
					H = this.md5_ii(H, G, J, I, K[C + 10], 15, -1051523);
					I = this.md5_ii(I, H, G, J, K[C + 1], 21, -2054922799);
					J = this.md5_ii(J, I, H, G, K[C + 8], 6, 1873313359);
					G = this.md5_ii(G, J, I, H, K[C + 15], 10, -30611744);
					H = this.md5_ii(H, G, J, I, K[C + 6], 15, -1560198380);
					I = this.md5_ii(I, H, G, J, K[C + 13], 21, 1309151649);
					J = this.md5_ii(J, I, H, G, K[C + 4], 6, -145523070);
					G = this.md5_ii(G, J, I, H, K[C + 11], 10, -1120210379);
					H = this.md5_ii(H, G, J, I, K[C + 2], 15, 718787259);
					I = this.md5_ii(I, H, G, J, K[C + 9], 21, -343485551);
					J = this.safe_add(J, E);
					I = this.safe_add(I, D);
					H = this.safe_add(H, B);
					G = this.safe_add(G, A)
				}
				if (this.mode == 16) {
					return Array(I, H)
				} else {
					return Array(J, I, H, G)
				}
			},	
			md5_cmn:function(F, C, B, A, E, D) {
				return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(C, F), this.safe_add(A, D)), E), B);
			},
			md5_ff:function md5_ff(C, B, G, F, A, E, D) {
				return this.md5_cmn((B & G) | ((~B) & F), C, B, A, E, D)
			},
			md5_gg:function md5_gg(C, B, G, F, A, E, D) {
				return this.md5_cmn((B & F) | (G & (~F)), C, B, A, E, D)
			},
			md5_hh:function md5_hh(C, B, G, F, A, E, D) {
				return this.md5_cmn(B ^ G ^ F, C, B, A, E, D)
			},
			md5_ii:function md5_ii(C, B, G, F, A, E, D) {
				return this.md5_cmn(G ^ (B | (~F)), C, B, A, E, D)
			},
			bit_rol:function bit_rol(A, B) {
				return (A << B) | (A >>> (32 - B));
			},
			safe_add:function safe_add(A, D) {
				var C = (A & 65535) + (D & 65535);
				var B = (A >> 16) + (D >> 16) + (C >> 16);
				return (B << 16) | (C & 65535)
			},
			bit_rol:function bit_rol(A, B) {
				return (A << B) | (A >>> (32 - B))
			},
			str2binl:function str2binl(D) {
				var C = Array();
				var A = (1 << this.chrsz) - 1;
				for (var B = 0; B < D.length * this.chrsz; B += this.chrsz) {
					C[B >> 5] |= (D.charCodeAt(B / this.chrsz) & A) << (B % 32)
				}
				return C
			},
			binl2str:function binl2str(C) {
				var D = "";
				var A = (1 << this.chrsz) - 1;
				for (var B = 0; B < C.length * 32; B += this.chrsz) {
					D += String.fromCharCode((C[B >> 5] >>> (B % 32)) & A)
				}
				return D
			},
			binl2hex:function binl2hex(C) {
				var B = this.hexcase ? "0123456789ABCDEF": "0123456789abcdef";
				var D = "";
				for (var A = 0; A < C.length * 4; A++) {
					D += B.charAt((C[A >> 2] >> ((A % 4) * 8 + 4)) & 15) + B.charAt((C[A >> 2] >> ((A % 4) * 8)) & 15)
				}
				return D
			}
		}	
	}
	
	MD5.prototype = {
		MD5:function(str){
			return this.Md5.md5(str);
		}
	
	}
	return {
        MD5:MD5
    }
});
