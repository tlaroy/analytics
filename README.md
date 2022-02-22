# Analytics v0.0.10

Phase I - Actors, Items, Journals, Macros, Scenes.<br>
Phase II - Playlists, Tables, Tiles.<br>
Phase III - Compendiums, Cards.<br>

Foundry VTT entity relationships.

ACTORS -

(1) Actors -> in Compendiums - Phase III<br>
(2) Actors <- with Items - Phase I<br>
(3) Actors -> in Journals - Phase I<br>
(4) Actors -> in Scenes As Tokens - Phase I<br>
(5) Actors -> in Tables - Phase II<br>

CARDS -

(6) Cards -> in Compendiums - Phase III<br>
(7) Cards -> in Journals - Phase III<br>
(8) Cards -> in Tables - Phase III<br>

COMPENDIUMS -

(1) Compendiums <- with Actors - Phase III<br>
(6) Compendiums <- with Cards - Phase III<br>
(9) Compendiums <- with Items - Phase III<br>
(10) Compendiums <- with Journals - Phase III<br>
(11) Compendiums <- with Macros - Phase III<br>
(12) Compendiums <- with Playlists - Phase III<br>
(13) Compendiums <- with Scenes - Phase III<br>
(14) Compendiums <- with Tables - Phase III<br>
(15) Compendiums >- in Tables - Phase III<br>

ITEMS -

(2) Items -> in Actors - Phase I<br>
(9) Items -> in Compendiums - Phase III<br>
(16-16) Items <> within Items - Phase I<br>
(17) Items -> in Journals - Phase I<br>
(18) Items <- with Macros - Phase I<br>
(19) Items -> in Tables - Phase II<br>

JOURNALS -

(3) Journals <- with Actors - Phase I<br>
(7) Journals <- with Cards - Phase III<br>
(10) Journals -> in Compendiums - Phase III<br>
(19) Journals <- with Items - Phase I<br>
(20-20) Journals <> within Journals - Phase I<br>
(21) Journals <- with Macros - Phase I<br>
(22) Journals <- with Playlists - Phase II<br>
(23) Journals <- with Scenes - Phase I<br>
(24) Journals -> in Scenes - Phase I<br>
(25) Journals -> in Scenes As Pins - Phase I<br>
(26) Journals -> in Tables - Phase II<br>
(27) Journals <- with Tables - Phase II<br>

MACROS -

(11) Macros -> in Compendiums - Phase III<br>
(18) Macros -> in Items - Phase I<br>
(21) Macros -> in Journals - Phase I<br>
(28) Macros -> in Tables - Phase II<br>
(29) Macros -> in Tiles - Phase II<br>

PLAYLISTS -

(12) Playlists -> in Compendiums - Phase III<br>
(22) Playlists -> in Journals - Phase II<br>
(30) Playlists -> in Scenes - Phase II<br>
(31) Playlists -> in Tables - Phase II<br>

SCENES -

(4) Scenes <- with Actors As Tokens - Phase I<br>
(13) Scenes -> in Compendiums - Phase III<br>
(23) Scenes -> in Journals - Phase I<br>
(24) Scenes <- with Journals - Phase I<br>
(25) Scenes <- with Journals As Pins - Phase I<br>
(30) Scenes <- with Playlists - Phase II<br>
(32) Scenes -> in Tables - Phase II<br>
(33) Scenes <- with Tiles - Phase II<br>

TABLES -

(5) Tables <- with Actors - Phase II<br>
(8) Tables <- with Cards - Phase II<br>
(14) Tables -> in Compendiums - Phase III<br>
(15) Tables <- with Compendiums - Phase III<br>
(16) Tables <- with Items - Phase II<br>
(27) Tables -> in Journals - Phase II<br>
(26) Tables <- with Journals - Phase II<br>
(25) Tables <- with Macros - Phase II<br>
(31) Tables <- with Playlists - Phase II<br>
(32) Tables <- with Scenes - Phase II<br>
(34-34) Tables <> within Tables - Phase II<br>

TILES -

(29) Tiles <- with Macros - Phase II<br>
(33) Tiles -> in Scenes - Phase II<br>

Where:
(##) - Relationship identifiers. Each appears twice, once<br>
for each “direction” of the relationship with exception<br>
of self-referencing (16, 20 & 32).<br>

An Example:
(1) Actors -> in Compendiums<br>
(1) Compendiums <- with Actors<br>

Phase - Availability of functional searches.

<i>Nokturnel</i>