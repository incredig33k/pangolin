#!/bin/bash

# Bash script to run Whisper.  Allows you to strip out the timestamps and removes the output files from the server

audioFile="${1}"
modelSize="${2}"
timestamps="${3}"
if [[ ! -f ~/.local/bin/whisper-ctranslate2 ]]; then
  echo "Error!!!  whisper-ctranslate2 not detected.  Modify whisper.sh or install whisper-ctranslate2 with 'pip3 install whisper-ctranslate2'"
fi

if [[ "${timestamps}" == "true" ]]; then
   # "${whisper}" "${audioFile}" --model "${modelSize}"
   ~/.local/bin/whisper-ctranslate2 "${audioFile}" --model "${modelSize}" --output_format txt  | grep -v "Transcription results written to '.*' directory" | grep -v "Detected language 'English' with probability"
else
   ~/.local/bin/whisper-ctranslate2 "${audioFile}" --model "${modelSize}" --output_format txt | sed 's/\[.*\]\ \ //g' | grep -v "Transcription results written to '.*' directory" | grep -v "Detected language 'English' with probability"
fi

sleep 2
# Delete the text file that is generated.
txtFile="./`echo $audioFile | sed "s/.\/uploads\///g" | cut -d"." -f1`.txt"
rm "${txtFile}"
rm "${audioFile}"