#!/bin/bash
# Zip de livraison : dossier stephane-verfaillie-maquette, sans _biblio, assemblages, node_modules ni médias lourds de l'audit.
set -e
V=${1:-1}
cd /home/claude
rm -f stephane-verfaillie-maquette-v$V.zip
zip -qr stephane-verfaillie-maquette-v$V.zip stephane-verfaillie-maquette \
  -x 'stephane-verfaillie-maquette/_biblio/*' 'stephane-verfaillie-maquette/assemblages/*' '*/node_modules/*' \
     'stephane-verfaillie-maquette/_audit/passes/*' 'stephane-verfaillie-maquette/_audit/rapport/captures/*' \
     'stephane-verfaillie-maquette/_audit/rapport/films/*' 'stephane-verfaillie-maquette/_audit/rapport/comparaisons/*' \
     'stephane-verfaillie-maquette/_audit/apercu/*.mp4' 'stephane-verfaillie-maquette/_suivi/cap-*'
ls -la stephane-verfaillie-maquette-v$V.zip
