# Analytics v0.0.9

Phase I - Actors, Items, Journals, Macros, Scenes.<br>
Phase II - Playlists, Tables, Tiles.<br>
Phase III - Compendiums, Cards.<br>

Foundry VTT entity relationships.

<table>
	<tr><td colspan=5>ACTORS -</td></tr>
	<tr><td>(1)</td><td>Actors</td><td>-&gt</td><td>In Compendiums</td><td>Phase III</td></tr>
	<tr><td>(2)</td><td>Actors</td><td>&lt-</td><td>with Items</td><td>Phase I</td></tr>
	<tr><td>(3)</td><td>Actors</td><td>-&gt</td><td>in Journals</td><td>Phase I</td></tr>
	<tr><td>(4)</td><td>Actors</td><td>-&gt</td><td>in Scenes As Tokens</td><td>Phase I</td></tr>
	<tr><td>(5)</td><td>Actors</td><td>-&gt</td><td>in Tables</td><td>Phase II</td></tr>
	<tr><td colspan=5>CARDS -</td></tr>
	<tr><td>(6)</td><td>Cards</td><td>-&gt</td><td>in Compendiums</td><td>Phase III</td></tr>
	<tr><td>(7)</td><td>Cards</td><td>-&gt</td><td>in Journals</td><td>Phase III</td></tr>
	<tr><td>(8)</td><td>Cards</td><td>-&gt</td><td>in Tables</td><td>Phase III</td></tr>
	<tr><td colspan=5>COMPENDIUMS -</td></tr>
	<tr><td>(1)</td><td>Compendiums</td><td>&lt-</td><td>with Actors</td><td>Phase III</td></tr>
	<tr><td>(6)</td><td>Compendiums</td><td>&lt-</td><td>with Cards</td><td>Phase III</td></tr>
	<tr><td>(9)</td><td>Compendiums</td><td>&lt-</td><td>with Items</td><td>Phase III</td></tr>
	<tr><td>(10)</td><td>Compendiums</td><td>&lt-</td><td>with Journals</td><td>Phase III</td></tr>
	<tr><td>(11)</td><td>Compendiums</td><td>&lt-</td><td>with Macros</td><td>Phase III</td></tr>
	<tr><td>(12)</td><td>Compendiums</td><td>&lt-</td><td>with Playlists</td><td>Phase III</td></tr>
	<tr><td>(13)</td><td>Compendiums</td><td>&lt-</td><td>with Scenes</td><td>Phase III</td></tr>
	<tr><td>(14)</td><td>Compendiums</td><td>&lt-</td><td>with Tables</td><td>Phase III</td></tr>
	<tr><td>(15)</td><td>Compendiums</td><td>-&gt</td><td>in Tables</td><td>Phase III</td></tr>
	<tr><td colspan=5>ITEMS -</td></tr>
	<tr><td>(2)</td><td>Items</td><td>-&gt</td><td>in Actors</td><td>Phase I</td></tr>
	<tr><td>(9)</td><td>Items</td><td>-&gt</td><td>in Compendiums</td><td>Phase III</td></tr>
	<tr><td>(16-16)</td><td>Items</td><td>&lt&gt</td><td>within Items</td><td>Phase I</td></tr>
	<tr><td>(17)</td><td>Items</td><td>-&gt</td><td>in Journals</td><td>Phase I</td></tr>
	<tr><td>(18)</td><td>Items</td><td>&lt-</td><td>with Macros</td><td>Phase I</td></tr>
	<tr><td>(19)</td><td>Items</td><td>-&gt</td><td>in Tables</td><td>Phase II</td></tr>
	<tr><td colspan=5>JOURNALS -</td></tr>
	<tr><td>(3)</td><td>Journals</td><td>&lt-</td><td>with Actors</td><td>Phase I</td></tr>
	<tr><td>(7)</td><td>Journals</td><td>&lt-</td><td>with Cards</td><td>Phase III</td></tr>
	<tr><td>(10)</td><td>Journals</td><td>-&gt</td><td>in Compendiums</td><td>Phase III</td></tr>
	<tr><td>(19)</td><td>Journals</td><td>&lt-</td><td>with Items</td><td>Phase I</td></tr>
	<tr><td>(20-20)</td><td>Journals</td><td>&lt&gt</td><td>within Journals</td><td>Phase I</td></tr>
	<tr><td>(21)</td><td>Journals</td><td>&lt-</td><td>with Macros</td><td>Phase I</td></tr>
	<tr><td>(22)</td><td>Journals</td><td>&lt-</td><td>with Playlists</td><td>Phase II</td></tr>
	<tr><td>(23)</td><td>Journals</td><td>&lt-</td><td>with Scenes</td><td>Phase I</td></tr>
	<tr><td>(24)</td><td>Journals</td><td>-&gt</td><td>in Scenes</td><td>Phase I</td></tr>
	<tr><td>(25)</td><td>Journals</td><td>-&gt</td><td>in Scenes As Pins</td><td>Phase I</td></tr>
	<tr><td>(26)</td><td>Journals</td><td>-&gt</td><td>in Tables</td><td>Phase II</td></tr>
	<tr><td>(27)</td><td>Journals</td><td>&lt-</td><td>with Tables</td><td>Phase II</td></tr>
	<tr><td colspan=5>MACROS -</td></tr>
	<tr><td>(11)</td><td>Macros</td><td>-&gt</td><td>in Compendiums</td><td>Phase III</td></tr>
	<tr><td>(18)</td><td>Macros</td><td>-&gt</td><td>in Items</td><td>Phase I</td></tr>
	<tr><td>(21)</td><td>Macros</td><td>-&gt</td><td>in Journals</td><td>Phase I</td></tr>
	<tr><td>(28)</td><td>Macros</td><td>-&gt</td><td>in Tables</td><td>Phase II</td></tr>
	<tr><td>(29)</td><td>Macros</td><td>-&gt</td><td>in Tiles</td><td>Phase II</td></tr>
	<tr><td colspan=5>PLAYLISTS -</td></tr>
	<tr><td>(12)</td><td>Playlists</td><td>-&gt</td><td>in Compendiums</td><td>Phase III</td></tr>
	<tr><td>(22)</td><td>Playlists</td><td>-&gt</td><td>in Journals</td><td>Phase II</td></tr>
	<tr><td>(30)</td><td>Playlists</td><td>-&gt</td><td>in Scenes</td><td>Phase II</td></tr>
	<tr><td>(31)</td><td>Playlists</td><td>-&gt</td><td>in Tables</td><td>Phase II</td></tr>
	<tr><td colspan=5>SCENES -</td></tr>
	<tr><td>(4)</td><td>Scenes</td><td>&lt-</td><td>with Actors As Tokens</td><td>Phase I</td></tr>
	<tr><td>(13)</td><td>Scenes</td><td>-&gt</td><td>in Compendiums</td><td>Phase III</td></tr>
	<tr><td>(23)</td><td>Scenes</td><td>-&gt</td><td>in Journals</td><td>Phase I</td></tr>
	<tr><td>(24)</td><td>Scenes</td><td>&lt-</td><td>with Journals</td><td>Phase I</td></tr>
	<tr><td>(25)</td><td>Scenes</td><td>&lt-</td><td>with Journals As Pins</td><td>Phase I</td></tr>
	<tr><td>(30)</td><td>Scenes</td><td>&lt-</td><td>with Playlists</td><td>Phase II</td></tr>
	<tr><td>(32)</td><td>Scenes</td><td>-&gt</td><td>in Tables</td><td>Phase II</td></tr>
	<tr><td>(33)</td><td>Scenes</td><td>&lt-</td><td>with Tiles</td><td>Phase II</td></tr>
	<tr><td colspan=5>TABLES -</td></tr>
	<tr><td>(5)</td><td>Tables</td><td>&lt-</td><td>with Actors</td><td>Phase II</td></tr>
	<tr><td>(8)</td><td>Tables</td><td>&lt-</td><td>with Cards</td><td>Phase II</td></tr>
	<tr><td>(14)</td><td>Tables</td><td>-&gt</td><td>in Compendiums</td><td>Phase III</td></tr>
	<tr><td>(15)</td><td>Tables</td><td>&lt-</td><td>with Compendiums</td><td>Phase III</td></tr>
	<tr><td>(16)</td><td>Tables</td><td>&lt-</td><td>with Items</td><td>Phase II</td></tr>
	<tr><td>(27)</td><td>Tables</td><td>-&gt</td><td>in Journals</td><td>Phase II</td></tr>
	<tr><td>(26)</td><td>Tables</td><td>&lt-</td><td>with Journals</td><td>Phase II</td></tr>
	<tr><td>(25)</td><td>Tables</td><td>&lt-</td><td>with Macros</td><td>Phase II</td></tr>
	<tr><td>(31)</td><td>Tables</td><td>&lt-</td><td>with Playlists</td><td>Phase II</td></tr>
	<tr><td>(32)</td><td>Tables</td><td>&lt-</td><td>with Scenes</td><td>Phase II</td></tr>
	<tr><td>(34-34)</td><td>Tables</td><td>&lt&gt</td><td>within Tables</td><td>Phase II</td></tr>
	<tr><td colspan=5>TILES -</td></tr>
	<tr><td>(29)</td><td>Tiles</td><td>&lt-</td><td>with Macros</td><td>Phase II</td></tr>
	<tr><td>(33)</td><td>Tiles</td><td>-&gt</td><td>in Scenes</td><td>Phase II</td></tr>
</table>

Where:<br>
(##) - Relationship identifiers. Each appears twice, once<br>
for each “direction” of the relationship with exception<br>
of self-referencing (16, 20 & 32).

An Example:<br>
 (1) Actors      -> in Compendiums<br>
 (1) Compendiums <- with Actors

Phase - Availability of functional searches.

<i>Nokturnel</i>
