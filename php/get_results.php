<?php

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

foreach ($_SESSION['hit_results'] as $data_entry) {
    ?>
    <tr>
        <td class='table-x_val'> <?= $data_entry['x'] ?> </td>
        <td class='table-y_val'> <?= $data_entry['y'] ?> </td>
        <td class='table-r_val'> <?= $data_entry['r'] ?> </td>
        <td class='table-hit_res'> <?= $data_entry['inShape'] ?> </td>
        <td> <?= $data_entry['currentTime'] ?> </td>
        <td> <?= $data_entry['executionTime'] ?> </td>
    </tr>
    <?php
}
