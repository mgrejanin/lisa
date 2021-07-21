export enum StatusIcons {
    input_sales_recipe = 'in_transaction',
    input_recharge = 'in_transaction',
    input_sales_tax_refund = 'in_transaction',
    input_sales_tax_cancel = 'in_transaction',
    input_regund_chargeback = 'in_transaction',
    input_pix_receivement = 'in_transaction',
    input_pix_refund_receivement = 'in_transaction',
    input_pix_transfer = 'in_transaction',
    input_pix_refund_transfer = 'in_transaction',
    input_receivables_transfer = 'in_transaction',

    output_sales_tax_refund = 'out_transaction',
    output_sales_cancel = 'out_transaction',
    output_bills = 'out_transaction',
    output_bank_withdrawal = 'out_transaction',
    output_picpay_withdrawal = 'out_transaction',
    output_judicial_block_transferred = 'out_transaction',
    output_pix_transfer = 'out_transaction',
    output_pix_refund_transfer = 'out_transaction',
    output_pix_refund_receivement = 'out_transaction',
    output_receivables_transfer = 'out_transaction',

    output_automatic_withdrawal = 'automatic_transaction',
}
