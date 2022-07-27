<?php


class Invoice {

}

class Order
{
    public ?Invoice $invoice = null;
}

$order = new Order();

// PHP 8
var_dump($order->invoice?->number);
var_dump($order->invoice->number ?? null);