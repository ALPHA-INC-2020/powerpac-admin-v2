<template>
  <CRow>
    <CCol
      sm="6"
      lg="3"
    >
      <CWidgetDropdown
        color="primary"
        :header="convert2String(order.orderCount)"
        text="Orders"
      >
        <!-- <template #default>
          <CDropdown
            color="transparent p-0"
            placement="bottom-end"
          >
            <template #toggler-content>
              <CIcon name="cil-settings" />
            </template>
            <CDropdownItem>Action</CDropdownItem>
            <CDropdownItem>Another action</CDropdownItem>
            <CDropdownItem>Something else here...</CDropdownItem>
            <CDropdownItem disabled>Disabled action</CDropdownItem>
          </CDropdown>
        </template> -->
        <template #footer>
          <CChartLineSimple
            pointed
            class="mt-3"
            style="height:70px"
            background-color="rgba(255,255,255,.2)"
            :data-points="order.orderChartData"
            point-hover-background-color="primary"
            label="Orders"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>

    <CCol
      sm="6"
      lg="3"
    >
      <CWidgetDropdown
        color="info"
        :header="convert2String(todayOrder.orderCount)"
        text="Today Order"
      >
        <!-- <template #default>
          <CDropdown
            color="transparent p-0"
            placement="bottom-end"
            :caret="false"
          >
            <template #toggler-content>
              <CIcon name="cil-location-pin" />
            </template>
            <CDropdownItem>Action</CDropdownItem>
            <CDropdownItem>Another action</CDropdownItem>
            <CDropdownItem>Something else here...</CDropdownItem>
            <CDropdownItem disabled>Disabled action</CDropdownItem>
          </CDropdown>
        </template> -->
        <template #footer>
          <CChartLineSimple
            pointed
            class="mt-3 mx-3"
            style="height:70px"
            :data-points="[1, 18, 9, 17, 34, 22, 11]"
            point-hover-background-color="info"
            :options="{ elements: { line: { tension: 0.00001 }}}"
            label="Today Order"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>
    <CCol
      sm="6"
      lg="3"
    >
      <CWidgetDropdown
        color="warning"
        :header="convert2String(product.productCount)"
        text="Total Products"
      >
        <!-- <template #default>
          <CDropdown
            color="transparent p-0"
            placement="bottom-end"
          >
            <template #toggler-content>
              <CIcon name="cil-settings" />
            </template>
            <CDropdownItem>Action</CDropdownItem>
            <CDropdownItem>Another action</CDropdownItem>
            <CDropdownItem>Something else here...</CDropdownItem>
            <CDropdownItem disabled>Disabled action</CDropdownItem>
          </CDropdown>
        </template> -->
        <template #footer>
          <CChartLineSimple
            class="mt-3"
            style="height:70px"
            background-color="rgba(255,255,255,.2)"
            :data-points="product.productChartData"
            :options="{ elements: { line: { borderWidth: 2.5 }}}"
            point-hover-background-color="warning"
            label="Products"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>
    <CCol
      sm="6"
      lg="3"
    >
      <CWidgetDropdown
        color="danger"
        :header="convert2String(sales.totalSales)"
        text="Sale Amount"
      >
        <!-- <template #default>
          <CDropdown
            color="transparent p-0"
            placement="bottom-end"
          >
            <template #toggler-content>
              <CIcon name="cil-settings" />
            </template>
            <CDropdownItem>Action</CDropdownItem>
            <CDropdownItem>Another action</CDropdownItem>
            <CDropdownItem>Something else here...</CDropdownItem>
            <CDropdownItem disabled>Disabled action</CDropdownItem>
          </CDropdown>
        </template> -->
        <template #footer>
          <CChartBarSimple
            :data-points="sales.saleChartData"
            class="mt-3 mx-3"
            style="height:70px"
            background-color="rgb(250, 152, 152)"
            label="Sales"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>
  </CRow>
</template>

<script>
import { CChartLineSimple, CChartBarSimple } from '../charts/index.js'

export default {
  props: {
    order: {
      orderCount: {
        type: Number
      },
      orderChartData: {
        type: Array
      }
    },
    todayOrder: {
      orderCount: {
        type: Number
      },
      orderChartData: {
        type: Array
      }
    },
    product: {
      productCount: {
        type: Number
      },
      productChartData: {
        type: Array
      }
    },
    sales: {
      totalSales: {
        type: Number
      },
      saleChartData: {
        type: Array
      }
    }
  },
  name: 'WidgetsDropdown',
  components: { CChartLineSimple, CChartBarSimple },
  methods: {
    convert2String (value) {
      return value.toString();
    }
  },

}
</script>
