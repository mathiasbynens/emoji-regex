module.exports = function() {
	return /<%= multipleCodePointsPart %>|<%= loneCodePointsPart %>/g;
};
