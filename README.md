# Analytics v0.0.10

Phase I - Actors, Items, Journals, Macros, Scenes.
Phase II - Playlists, Tables, Tiles.
Phase III - Compendiums, Cards.

Foundry VTT entity relationships.

ACTORS -

(1) Actors -> in Compendiums - Phase III
(2) Actors <- with Items - Phase I
(3) Actors -> in Journals - Phase I
(4) Actors -> in Scenes As Tokens - Phase I
(5) Actors -> in Tables - Phase II

CARDS -

(6) Cards -> in Compendiums - Phase III
(7) Cards -> in Journals - Phase III
(8) Cards -> in Tables - Phase III

COMPENDIUMS -

(1) Compendiums <- with Actors - Phase III
(6) Compendiums <- with Cards - Phase III
(9) Compendiums <- with Items - Phase III
(10) Compendiums <- with Journals - Phase III
(11) Compendiums <- with Macros - Phase III
(12) Compendiums <- with Playlists - Phase III
(13) Compendiums <- with Scenes - Phase III
(14) Compendiums <- with Tables - Phase III
(15) Compendiums >- in Tables - Phase III

ITEMS -

(2) Items -> in Actors - Phase I
(9) Items -> in Compendiums - Phase III
(16-16) Items <> within Items - Phase I
(17) Items -> in Journals - Phase I
(18) Items <- with Macros - Phase I
(19) Items -> in Tables - Phase II

JOURNALS -

(3) Journals <- with Actors - Phase I
(7) Journals <- with Cards - Phase III
(10) Journals -> in Compendiums - Phase III
(19) Journals <- with Items - Phase I
(20-20) Journals <> within Journals - Phase I
(21) Journals <- with Macros - Phase I
(22) Journals <- with Playlists - Phase II
(23) Journals <- with Scenes - Phase I
(24) Journals -> in Scenes - Phase I
(25) Journals -> in Scenes As Pins - Phase I
(26) Journals -> in Tables - Phase II
(27) Journals <- with Tables - Phase II

MACROS -

(11) Macros -> in Compendiums - Phase III
(18) Macros -> in Items - Phase I
(21) Macros -> in Journals - Phase I
(28) Macros -> in Tables - Phase II
(29) Macros -> in Tiles - Phase II

PLAYLISTS -

(12) Playlists -> in Compendiums - Phase III
(22) Playlists -> in Journals - Phase II
(30) Playlists -> in Scenes - Phase II
(31) Playlists -> in Tables - Phase II

SCENES -

(4) Scenes <- with Actors As Tokens - Phase I
(13) Scenes -> in Compendiums - Phase III
(23) Scenes -> in Journals - Phase I
(24) Scenes <- with Journals - Phase I
(25) Scenes <- with Journals As Pins - Phase I
(30) Scenes <- with Playlists - Phase II
(32) Scenes -> in Tables - Phase II
(33) Scenes <- with Tiles - Phase II

TABLES -

(5) Tables <- with Actors - Phase II
(8) Tables <- with Cards - Phase II
(14) Tables -> in Compendiums - Phase III
(15) Tables <- with Compendiums - Phase III
(16) Tables <- with Items - Phase II
(27) Tables -> in Journals - Phase II
(26) Tables <- with Journals - Phase II
(25) Tables <- with Macros - Phase II
(31) Tables <- with Playlists - Phase II
(32) Tables <- with Scenes - Phase II
(34-34) Tables <> within Tables - Phase II

TILES -

(29) Tiles &lt- with Macros - Phase II
(33) Tiles -&gt in Scenes - Phase II

Where:
(##) - Relationship identifiers. Each appears twice, once
for each “direction” of the relationship with exception
of self-referencing (16, 20 & 32).

An Example:
(1) Actors -> in Compendiums
(1) Compendiums <- with Actors

Phase - Availability of functional searches.

Nokturnel