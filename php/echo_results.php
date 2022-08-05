<?php

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (!isset($_SESSION['hit_results'])) {
    $_SESSION['hit_results'] = [];
}

function echo_results(int $data_version): void
{
    $required_data = array_slice($_SESSION['hit_results'], offset: $data_version, preserve_keys: true);
    foreach ($required_data as $data_entry) {
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
}
