#!/bin/sh

DOC_DIR="docs"

# Loop though every md files in subfolder $DOC_DIR
find $DOC_DIR -name "*.md" | while read pathfile; do 

	# If no header set
	# check if first line is "---"
	if [ "$(awk 'FNR <= 1' $pathfile)" != "---" ];then

		# Start Header
		sed -i '1s/^/---\n\n/' $pathfile;

		# Looking for the main title in file
		title=$(sed -n '/^\#\ /p' $pathfile);
		# If a title was find, add it in the header	
		if [ ! -z "$title" ];then
			# Remove the "#" from the title
			sed -i -e "1s/^/title: $(echo "$title" | tail -c +1)\n/" $pathfile;
		fi;

		# Cleaning filename
		filename=$(basename $pathfile);
		rawFilename=${filename%.*};

		# Set the id egal the filename
		sed -i -e "1s/^/id: $rawFilename \n/" $pathfile;

		# End Header
		sed -i '1s/^/---\n/' $pathfile;
	fi
done
