all: clean docs

clean:
	trap 'rm -r docs' EXIT

docs:
	# http://usejsdoc.org/about-commandline.html
	jsdoc -d docs src/d3.geometer.js
